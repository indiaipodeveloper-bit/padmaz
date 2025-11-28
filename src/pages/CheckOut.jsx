import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiCreditCard } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { backendUrl } from "../assets/constant";

const DESIGN_SCREENSHOT =
  "/mnt/data/A_checkout_page_for_an_online_furniture_store_is_d.png";

export default function Checkout() {
  const user = useSelector((state) => state.auth.userinfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [isTermsAndConditions, setisTermsAndConditions] = useState(false);
  const location = useLocation();
  const [name, setname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState(user.email);
  const [city, setcity] = useState("");
  const [zipCode, setzipCode] = useState("");

  const shippingCharges = 40;

  const PlaceOrder = async () => {
    console.log({ name, email, phoneNumber, city, zipCode });
    // const res = await axios.post(`${backendUrl}/api/order/place-order`)
    // console.log(res)
  };

  const validateform = () => {
    if (!name) {
      toast.error("Name is Required");
      return false;
    }
    if (
      phoneNumber.split("").every((e) => typeof parseInt(e) === Number) ||
      phoneNumber.length < 10
    ) {
      console.log(phoneNumber);
      toast.error("Enter a valid Phone Number split");
      return false;
    }

    const indianPhoneRegex = /^(?:\+91[\s-]?|0)?[6-9]\d{9}$/;

    if (!indianPhoneRegex.test(phoneNumber.trim())) {
      toast.error("Enter a valid Indian phone number");
      return false;
    }

    if (!city) {
      toast.error("City is Required");
      return false;
    }
    if (!zipCode) {
      toast.error("Zip Code is Required");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (location.state !== "clicked") {
      navigate("/");
    }
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, i) => acc + Number(i.price) * Number(i.quantity),
        0
      ),
    [cartItems]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 p-10 lg:p-14">
          <div className="flex items-center flex-wrap justify-between mb-8">
            <div className="flex flex-wrap items-center gap-6">
              <img
                src={DESIGN_SCREENSHOT}
                alt="logo"
                className="w-28 h-20 object-cover rounded-md shadow-sm"
              />
              <p className="text-3xl font-extrabold tracking-tight text-[#2b2b2b]">
                Checkout
              </p>
            </div>

            <div className="flex items-center flex-wrap my-2.5 text-sm text-gray-600 gap-6">
              <div className="flex items-center gap-2">
                <FiShoppingCart className="text-gray-400" /> <span>Cart</span>
              </div>
              <div className="flex items-center gap-2 text-[#bf2a28] font-semibold">
                <FiCreditCard /> <span>Checkout</span>
              </div>
            </div>
          </div>

          <p className="text-lg font-semibold mb-6 text-[#2b2b2b]">
            Shipping Information
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name <span className="text-[#bf2a28]">*</span>
              </label>
              <input
                onChange={(e) => setname(e.target.value)}
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
                value={email}
                disabled
                className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone number <span className="text-[#bf2a28]">*</span>
              </label>
              <div className="mt-1 flex items-center gap-3">
                <div className="flex items-center px-3 py-3 border border-[#e9e6e2] rounded-xl bg-white">
                  <p>+91</p>
                </div>
                <input
                  onChange={(e) => setphoneNumber(e.target.value)}
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
                  <option>India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  onChange={(e) => setcity(e.target.value)}
                  placeholder="Enter city"
                  className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  onChange={(e) => setzipCode(e.target.value)}
                  placeholder="Enter ZIP code"
                  className="mt-1 block w-full rounded-xl border border-[#e9e6e2] shadow-sm p-4"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="agree"
                onChange={() => setisTermsAndConditions(!isTermsAndConditions)}
                className="mt-1"
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I have read and agree to the Terms and Conditions.
              </label>
            </div>
          </div>
        </div>

        <div className="px-8 border-l py-5 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-semibold mb-6">Review your cart</p>

            <div className="space-y-4 max-h-[480px] z-50 overflow-y-auto">
              {cartItems.map((p) => {
                return (
                  <div
                    key={p.title}
                    className="flex items-center gap-4 border rounded-xl p-3 bg-white"
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="">
                          <p className="font-semibold text-gray-800">{p.title}</p>
                          <p className="font-light text-gray-800 text-sm">{p.description}</p>
                        </div>
                        <p className="text-sm text-gray-600">{p.quantity}x</p>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">Rs {p.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <div className="mt-6 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <div className="flex gap-2">
                    {subtotal < 200 && (
                      <span className="text-red-500 font-bold">
                        (Min 200 Rs)
                      </span>
                    )}
                    <span className="font-bold">Rs {subtotal}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Shipping charges</span>
                  <span>{shippingCharges}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-3">
                  <span>Total</span>
                  <span className="font-bold">
                    Rs {subtotal + shippingCharges}
                  </span>
                </div>
              </div>

              <button
                disabled={isTermsAndConditions || subtotal < 200 ? false : true}
                onClick={() => {
                  if (validateform()) {
                    PlaceOrder();
                  }
                }}
                className={`${
                  isTermsAndConditions && subtotal > 200
                    ? "mt-6 w-full cursor-pointer bg-[#bf2a28] hover:bg-[#e5ac55] text-white rounded-xl py-3 font-bold"
                    : "bg-gray-400 text-white mt-6 w-full cursor-not-allowed rounded-xl py-3 font-bold"
                }`}
              >
                Pay Now
                {!isTermsAndConditions && (
                  <p className="text-sm">
                    (agree to the terms and conditions to order)
                  </p>
                )}
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
