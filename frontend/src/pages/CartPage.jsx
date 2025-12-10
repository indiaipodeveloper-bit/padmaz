import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DecreaseQuantity,
  IncreaseQuantity,
  RemoveProductFromCart,
} from "../redux/slices/CartSlice";
import { RemoveProductFromUserDetailsOnBackend } from "./Cart/CartComponent";
import { backendUrl } from "../assets/constant";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, i) => acc + Number(i.price) * Number(i.quantity),
        0
      ),
    [cartItems]
  );
  const shippingCharges = 40;

  const handleProceedToCheckout = () => {
    if (!cartItems.length) {
      toast.error("No Items In Your Cart");
      return;
    }
    navigate("/check-out", { state: "clicked" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto max-h-[850px]  rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2  h-full max-h-[750px]  overflow-auto p-5 lg:px-14">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-md cursor-pointer bg-white border border-[#e9e6e2]"
              >
                <FiChevronLeft />
              </button>
              <p className="text-3xl font-extrabold tracking-tight text-[#2b2b2b]">
                Your Cart
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Items</span>
                <div className="font-semibold">{cartItems.length}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {cartItems.length === 0 && (
              <div className="p-8 bg-white rounded-xl border border-dashed border-gray-200 text-center">
                <p className="font-semibold text-gray-700 mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-500">
                  Add some products before checkout.
                </p>
              </div>
            )}

            {cartItems.map((p) => (
              <div
                key={p.title}
                className="flex items-center gap-4 border rounded-xl p-4 bg-white"
              >
                <img
                  src={`${backendUrl}/uploads/products/${p.img}`}
                  alt={p.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800">{p.title}</p>
                    <button
                      onClick={() => {
                        dispatch(RemoveProductFromCart(p));
                        RemoveProductFromUserDetailsOnBackend(p);
                      }}
                      className="p-2 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#bf2a28] text-[#bf2a28] rounded-md bg-white border "
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">Rs {p.price}</p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center overflow-hidden">
                      <button
                        onClick={() => dispatch(DecreaseQuantity(p))}
                        className="p-1.5 border hover:bg-gray-200 rounded-md cursor-pointer"
                      >
                        <FiMinus />
                      </button>
                      <div className="px-4 py-3">{p.quantity}</div>
                      <button
                        onClick={() => dispatch(IncreaseQuantity(p))}
                        className="p-1.5 border rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="text-sm text-gray-500">
                      Rs {Number(p.price) * Number(p.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="px-8 border-l py-5 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xl font-semibold mb-6">Order summary</p>

            <div className="space-y-4 max-h-[480px] overflow-y-auto">
              {cartItems.map((p) => (
                <div
                  key={p.title}
                  className="flex items-center gap-4 bg-white rounded-xl p-3 border"
                >
                  <img
                    src={`${backendUrl}/uploads/products/${p.img}`}
                    alt={p.title}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-gray-800">
                        {p.title}
                      </p>
                      <p className="text-sm text-gray-600">{p.quantity}x</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">Rs {p.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <div className="flex gap-2">
                  {subtotal < 200 && (
                    <span className="text-red-500 font-bold">(Min 200 Rs)</span>
                  )}
                  <span className="font-bold">Rs {subtotal}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Shipping charges</span>
                <span>Rs {shippingCharges}</span>
              </div>

              <div className="flex justify-between font-bold text-lg mt-3">
                <span>Total</span>
                <span>Rs {subtotal + shippingCharges}</span>
              </div>
            </div>

            <button
              onClick={() => {
                handleProceedToCheckout();
              }}
              disabled={!cartItems.length || subtotal < 200 ? true : false}
              className={`mt-6 w-full rounded-xl py-3 font-bold text-white ${
                !cartItems.length || subtotal >= 200
                  ? "bg-[#bf2a28] hover:bg-[#e5ac55] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Check Out
            </button>

            <div className="mt-6 flex items-start gap-3 text-sm text-gray-600">
              <div className="p-3 rounded-full bg-white border border-[#e9e6e2]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#bf2a28]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Secure Checkout - SSL Encrypted</p>
                <p className="text-xs text-gray-500">
                  Ensuring your financial and personal details are secure during
                  every transaction.
                </p>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
