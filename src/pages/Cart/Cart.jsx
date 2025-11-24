import React from "react";
import { IoMdClose } from "react-icons/io";
import CartComponent from "./CartComponent";
import { useNavigate } from "react-router-dom";

const Cart = ({ isDrawerOpen, setisDrawerOpen }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        isDrawerOpen ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={() => setisDrawerOpen(!isDrawerOpen)}
          className="cursor-pointer"
        >
          <IoMdClose className="h-8 w-8 font-bold" />
        </button>
      </div>
      {/* cart contents */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 ">Your Cart</h2>
        <CartComponent />
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={() => {
            navigate("check-out", { state: "clicked" });
            setisDrawerOpen(false);
          }}
          className="w-full cursor-pointer bg-[#bf2a28] text-white py-3 rounded-lg font-semibold hover:opacity-80 transition"
        >
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, Taxes, and Discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default Cart;
