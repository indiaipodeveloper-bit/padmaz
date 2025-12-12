import express from "express";
import crypto from "crypto";
import { razorpay, getPlanId } from "../utils/razorpay.js";
import { auth } from "../utils/auth.js";
import User from "../models/User.js";
import Payment from "../models/Payment.js";
import { appendPrintAddress } from "../utils/sheets.js";
import { sendEmail } from "../utils/email.js";
import { buildOrderConfirmationEmail } from "../utils/orderConfirmationTemplate.js";

const router = express.Router();



router.post("/create-order", auth, async (req, res) => {
  try {
    const { planKey, years, address } = req.body || {};
    if (!ANNUAL_KEYS.has(planKey)) {
      return res.status(400).json({ error: "Only annual plans are allowed" });
    }
    const y = Number(years);
    if (![1, 2, 3].includes(y)) {
      return res.status(400).json({ error: "years must be 1, 2 or 3" });
    }
    if (planKey.startsWith("print_") && address) {
      await User.findByIdAndUpdate(req.userId, {
        $set: { printAddress: address },
      });
      try {
        const u = await User.findById(req.userId).lean();
        await appendPrintAddress({
          when: new Date().toISOString(),
          source: "one-time",
          userId: req.userId,
          name: u?.name || "",
          email: u?.email || "",
          phone: u?.phone || "",
          planKey,
          years: String(y),
          line1: address?.line1 || "",
          line2: address?.line2 || "",
          city: address?.city || "",
          state: address?.state || "",
          pincode: address?.pincode || address?.zip || "",
          country: address?.country || "IN",
        });
      } catch {}
    }
    const amount = computeOneTimeAmountPaise(planKey, y);
    const receipt = makeReceipt("ot", req.userId);
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt,
      notes: {
        userId: req.userId,
        planKey,
        years: String(y),
        type: "one-time",
      },
    });
    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (e) {
    res.status(500).json({ error: e?.message || "Failed to create order" });
  }
});



async function handleWebhook(req, res) {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("hex");
    if (expected !== signature)
      return res.status(400).send("Invalid signature");

    const evt = req.body;
    const type = evt?.event || "";
    const pay = evt?.payload?.payment?.entity;
    const subEntity = evt?.payload?.subscription?.entity;
    const refund = evt?.payload?.refund?.entity;

    if (type === "payment.captured") {
      if (pay?.notes?.type === "one-time") {
        const userId = pay.notes?.userId;
        const years = Number(pay.notes?.years || 1);
        const planKey = pay.notes?.planKey || "digital_annual";
        if (userId && ANNUAL_KEYS.has(planKey)) {
          const start = new Date(pay.created_at * 1000);
          await User.findByIdAndUpdate(userId, {
            $set: {
              planKey,
              subscriptionId: pay.id,
              subscriptionStatus: "active",
              subscriptionStartedAt: start,
              subscriptionValidUntil: endOfPeriod(start, years, 0),
              refundPartial: false,
              refundLastAt: undefined,
            },
          });
          await Payment.updateOne(
            { userId, gatewayRef: pay.id },
            {
              $set: {
                type: "one-time",
                status: "success",
                amount: pay.amount / 100,
                paidAt: new Date(pay.created_at * 1000),
                cycleMonth: new Date(pay.created_at * 1000)
                  .toISOString()
                  .slice(0, 7),
              },
            },
            { upsert: true }
          );
        }
      } else if (pay?.subscription_id) {
        let user = await User.findOne({ subscriptionId: pay.subscription_id });

        let sub = subEntity;
        if (!sub) {
          sub = await razorpay.subscriptions
            .fetch(pay.subscription_id)
            .catch(() => null);
        }

        if (!user && sub?.notes?.userId) {
          user = await User.findById(sub.notes.userId).catch(() => null);
        }

        if (user) {
          const start = new Date(pay.created_at * 1000);
          const isFirst = !user.subscriptionStartedAt;
          const planKeyFromNotes =
            pay?.notes?.planKey ||
            sub?.notes?.planKey ||
            user.planKey ||
            "digital_monthly";
          const months = getBillingMonths(planKeyFromNotes);
          const valid = endOfPeriod(start, 0, months);

          await User.updateOne(
            { _id: user._id },
            {
              $set: {
                subscriptionId: pay.subscription_id,
                planKey: planKeyFromNotes,
                subscriptionStatus: "active",
                subscriptionStartedAt: isFirst
                  ? start
                  : user.subscriptionStartedAt,
                subscriptionValidUntil: valid,
                refundPartial: false,
                refundLastAt: undefined,
              },
            }
          );

          await Payment.updateOne(
            { userId: user._id, gatewayRef: pay.id },
            {
              $set: {
                type: isFirst ? "initial" : "recurring",
                status: "success",
                amount: pay.amount / 100,
                paidAt: new Date(pay.created_at * 1000),
                cycleMonth: new Date(pay.created_at * 1000)
                  .toISOString()
                  .slice(0, 7),
              },
            },
            { upsert: true }
          );
        }
      }
    }

    if (
      type === "payment.refunded" ||
      type === "refund.processed" ||
      type === "refund.created"
    ) {
      if (refund && pay) {
        const full = refund.amount >= pay.amount;
        let user = null;
        if (pay.subscription_id)
          user = await User.findOne({ subscriptionId: pay.subscription_id });
        if (!user && pay.notes?.userId)
          user = await User.findById(pay.notes.userId);
        if (user) {
          if (full) {
            await User.updateOne(
              { _id: user._id },
              {
                $set: {
                  subscriptionStatus: "cancelled",
                  subscriptionValidUntil: new Date(Date.now() - 1),
                },
              }
            );
            await Payment.updateOne(
              { userId: user._id, gatewayRef: pay.id },
              { $set: { status: "refunded" } }
            );
            if (pay.subscription_id) {
              await razorpay.subscriptions
                .cancel(pay.subscription_id, { cancel_at_cycle_end: false })
                .catch(() => {});
            }
          } else {
            await User.updateOne(
              { _id: user._id },
              {
                $set: {
                  refundPartial: true,
                  refundLastAt: new Date(
                    refund.created_at ? refund.created_at * 1000 : Date.now()
                  ),
                },
              }
            );
            await Payment.updateOne(
              { userId: user._id, gatewayRef: pay.id },
              { $set: { status: "partial_refund" } }
            );
          }
        }
      }
    }

    if (type === "subscription.cancelled") {
      const sub = subEntity;
      if (sub?.id) {
        const user = await User.findOne({ subscriptionId: sub.id });
        if (user) {
          const now = Date.now();
          const fromDb =
            user.subscriptionValidUntil instanceof Date
              ? user.subscriptionValidUntil.getTime()
              : null;
          const fromRzp = sub?.current_end ? sub.current_end * 1000 - 1 : null;
          const paidUntilTs = Math.max(fromDb || 0, fromRzp || 0);
          if (paidUntilTs && paidUntilTs > now) {
            await User.updateOne(
              { _id: user._id },
              {
                $set: {
                  subscriptionStatus: "cancelled_at_period_end",
                  subscriptionValidUntil: new Date(paidUntilTs),
                },
              }
            );
          } else {
            await User.updateOne(
              { _id: user._id },
              {
                $set: {
                  subscriptionStatus: "cancelled",
                  subscriptionValidUntil: new Date(Date.now() - 1),
                },
              }
            );
          }
        } else {
          const endTs = sub?.current_end
            ? sub.current_end * 1000 - 1
            : Date.now() - 1;
          await User.updateOne(
            { subscriptionId: sub.id },
            {
              $set: {
                subscriptionStatus: "cancelled_at_period_end",
                subscriptionValidUntil: new Date(endTs),
              },
            }
          );
        }
      }
    }

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
}

router.post("/confirm", auth, async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body || {};
    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
    if (expected !== signature) {
      return res.status(400).json({ ok: false, error: "Bad signature" });
    }


    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || "Failed" });
  }
});

export const paymentWebhook = handleWebhook;
export default router;
