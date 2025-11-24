import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiTruck,
  FiShoppingCart,
  FiCreditCard,
  FiChevronRight,
} from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";

// Use the uploaded design screenshot as a placeholder product/logo image.
// Move this file into your project's public or src/assets and update the path if needed.
const DESIGN_SCREENSHOT =
  "/mnt/data/A_checkout_page_for_an_online_furniture_store_is_d.png";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cart = [
    {
      id: 1,
      title: "DuoComfort Sofa Premium",
      qty: 1,
      price: 20.0,
      img: DESIGN_SCREENSHOT,
    },
    {
      id: 2,
      title: "IronOne Desk",
      qty: 1,
      price: 25.0,
      img: DESIGN_SCREENSHOT,
    },
  ];

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 5.0;
  const discount = -10.0;
  const total = subtotal + shipping + discount;

  useEffect(() => {
    if (location.state !== "clicked") {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">

        <div className="lg:col-span-2 p-10 lg:p-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <img
                src={DESIGN_SCREENSHOT}
                alt="logo"
                className="w-28 h-20 object-cover rounded-md shadow-sm"
              />
              <p className="text-3xl font-extrabold tracking-tight text-[#2b2b2b]">
                Checkout
              </p>
            </div>

            <div className="flex items-center text-sm text-gray-600 gap-6">
              <div className="flex items-center gap-2">
                <FiShoppingCart className="text-gray-400" /> <span>Cart</span>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineCheck className="text-gray-400" /> <span>Review</span>
              </div>
              <div className="flex items-center gap-2 text-[#bf2a28] font-semibold">
                <FiCreditCard /> <span>Checkout</span>
              </div>
            </div>
          </div>

          <p className="text-lg font-semibold mb-6 text-[#2b2b2b]">
            Shipping Information
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <label className="flex-1 p-3 border rounded-xl bg-white shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition">
              <input type="radio" name="delivery" className="form-radio" />
              <div className="flex items-center gap-2 text-gray-700">
                <FiTruck /> <span>Delivery</span>
              </div>
            </label>
            <label className="flex-1 p-3 border rounded-xl bg-white shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition">
              <input type="radio" name="delivery" className="form-radio" />
              <div className="flex items-center gap-2 text-gray-700">
                <AiOutlineCheck /> <span>Pick up</span>
              </div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name <span className="text-[#bf2a28]">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address <span className="text-[#bf2a28]">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone number <span className="text-[#bf2a28]">*</span>
              </label>
              <div className="mt-1 flex items-center gap-3">
                <div className="flex items-center px-3 py-3 border border-[#e9e6e2] rounded-xl bg-white">
                  <img
                    src={DESIGN_SCREENSHOT}
                    alt="flag"
                    className="w-5 h-5 object-cover rounded-sm"
                  />
                  <FiChevronRight className="ml-2 text-gray-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="flex-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country <span className="text-[#bf2a28]">*</span>
                </label>
                <select className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4">
                  <option>Choose country</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  placeholder="Enter city"
                  className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  placeholder="Enter ZIP code"
                  className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type="checkbox" id="agree" className="mt-1" />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I have read and agree to the Terms and Conditions.
              </label>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Link to="/" className="text-sm text-gray-600 hover:underline">
                Back to cart
              </Link>
              <button
                type="submit"
                className="ml-auto bg-[#bf2a28] hover:bg-[#e5ac55] text-white px-6 py-3 rounded-xl font-bold"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 border-l hidden lg:block bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-semibold mb-6">Review your cart</p>

            <div className="space-y-4">
              {cart.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 border rounded-xl p-3 bg-white"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{p.title}</p>
                      <p className="text-sm text-gray-600">{p.qty}x</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <input
                  className="flex-1 rounded-xl border border-[#e9e6e2] p-3"
                  placeholder="Discount code"
                />
                <button className="text-[#bf2a28] font-semibold">Apply</button>
              </div>

              <div className="mt-6 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-[#bf2a28] hover:bg-[#e5ac55] text-white rounded-xl py-3 font-bold">
                Pay Now
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
                  <p className="font-semibold">
                    Secure Checkout - SSL Encrypted
                  </p>
                  <p className="text-xs text-gray-500">
                    Ensuring your financial and personal details are secure
                    during every transaction.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
