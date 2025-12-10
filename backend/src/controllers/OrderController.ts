import type { Request, Response } from "express";
import { Order } from "../models/OrderModel.js";
import { User } from "../models/User.js";
import { createOrderInGoogleSheet } from "./SheetsController.js";
import { appendRows } from "../sheets/sheets.js";

export async function PlaceOrder(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      city,
      zipCode,
      cartItems,
      TotalPrice,
    } = req.body;
    const order = await Order.create({
      name,
      email,
      phone: phoneNumber,
      address,
      city,
      zipCode,
      products: cartItems,
      TotalPrice,
      OrderedBy: req.user._id,
    });
    const row = [
      new Date().toISOString(),
      name,
      email,
      phoneNumber,
      address,
      city,
      zipCode,
      "Processing",
      TotalPrice,
    ];

    await appendRows({
      // @ts-ignore
      spreadsheetId: process.env.SHEET_ID,
      tabName: process.env.SHEET_TAB || "Padmaz-Orders",
      rows: [row],
    });
    order.populate("OrderedBy");
    const user = await User.findOne({ _id: req.user._id });
    user?.orderHistory.push(order);
    // @ts-ignore
    user.productsInCart = [];
    await user?.save();

    return res.status(200).json({ msg: "Order Placed Successfully" });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}
