import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendUrl } from "../assets/constant";
import { toast } from "sonner";

export default function MyOrders() {
  const navigate = useNavigate();
  const myOrder = useSelector((state) => state.auth.userinfo.orderHistory);
  const [expanded, setExpanded] = useState({});
  const [loadingCancel, setLoadingCancel] = useState(null);

  function toggleExpand(id) {
    setExpanded((e) => ({ ...e, [id]: !e[id] }));
  }

  return (
    <div className="p-2">
      <div className="md:pt-2 px-4 text-center">
        <motion.div
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="lg:text-5xl md:text-4xl text-3xl text-[#e5ac55] font-bold my-5">
            Purchase History
          </p>
          <p className="text-sm text-gray-500">
            Track, review or cancel your recent orders
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto py-8">
        {myOrder.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 rounded-lg shadow-md"
          >
            <p className="text-xl font-semibold">No orders yet</p>
            <p className="mt-2 text-gray-500">
              Browse the menu and add items to place your first order.
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="mt-6 bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold px-6 py-3 rounded-xl"
            >
              Browse Menu
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {myOrder.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-xl shadow-md border border-[#8b4513]/10 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-4">
                  <div className="flex-1 text-start">
                    <p className="text-lg font-bold">Order {i + 1}</p>
                    <p className="text-sm text-gray-600">
                      Placed: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm mt-2">
                      Shipping Address : {order.address}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[#e5ac55]/20 text-[#e5ac55]">
                        {order.status}
                      </span>
                      <span className="text-xl font-bold">
                        {order.TotalPrice} Rs
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="px-4 py-2 rounded-md bg-white cursor-pointer border hover:shadow transition-all duration-200"
                    >
                      {expanded[order._id] ? "Hide Details" : "View Details"}
                    </button>

                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        disabled={loadingCancel === order._id}
                        className="px-4 py-2 rounded-md cursor-pointer bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold transition-all duration-200"
                      >
                        {loadingCancel === order._id
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    )}
                  </div>
                </div>

                {expanded[order._id] && (
                  <div className="border-t p-4 grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="font-semibold mb-2">Items</p>
                      <div className="flex flex-col gap-3">
                        {order.products.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <img
                              src={`${backendUrl}/uploads/products/${it.img}`}
                              alt={it.title}
                              className="w-20 h-20 rounded-md object-cover"
                            />
                            <div>
                              <p className="font-bold">{it.title}</p>
                              <p className="text-sm">
                                Qty: {it.quantity} • {it.price} Rs each
                              </p>
                              <button
                                onClick={() => goToProduct(it.title)}
                                className="mt-2 text-sm underline"
                              >
                                View product
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Order Summary</p>
                      <div className="p-4 rounded-lg">
                        <div className="flex justify-between">
                          <span>Items total</span>
                          <span>{order.TotalPrice - 40} Rs</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span>Delivery</span>
                          <span>40 Rs</span>
                        </div>
                        <div className="flex justify-between mt-4 font-bold text-lg">
                          <span>Total</span>
                          <span>{order.TotalPrice} Rs</span>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          Delivery Address
                        </p>
                        <p className="text-sm">{order.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
