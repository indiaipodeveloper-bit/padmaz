import React from "react";
import { IoMdClose } from "react-icons/io";
import CartComponent from "./CartComponent";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = ({ isDrawerOpen, setisDrawerOpen }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 h-full overflow-y-scroll sm:w-1/2 md:w-[30rem]  bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
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
      <div className="flex-grow p-4  overflow-y-auto">
        {cartItems.length !== 0 && (
          <div className="flex justify-between items-center text-center">
            <p className="text-xl font-semibold ">Your Cart</p>
            <button
              onClick={() => {
                navigate("/cart");
                setisDrawerOpen(false);
              }}
              className="text-red-500 hover:underline cursor-pointer hover:text-red-400"
            >
              Go To Cart
            </button>
          </div>
        )}
        <CartComponent />
      </div>
      <>
        {!!cartItems.length && (
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
        )}
      </>
    </div>
  );
};

export default Cart;
