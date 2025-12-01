import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import { ItemcategoryArr, products } from "../assets/constant";
import { AddProductToCart } from "../redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProductToUserDetailsOnBackend,
  checkIsProductAlreadyInCart,
} from "./Home";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const allProducts = useSelector((state) => state.products.allProducts) ?? [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setsearch] = useState("");
  const [selectCategory, setselectCategory] = useState(""); // empty = show all

  // show all when no category selected
  const FilteredProducts = selectCategory
    ? allProducts.filter(
        (e) => Array.isArray(e.category) && e.category.includes(selectCategory)
      )
    : allProducts;
  return (
    <div className="min-h-screen overflow-hidden ">
      <div className=" p-5 absolute border-none outline-none right-5">
        <Dropdown
          value={selectCategory}
          onChange={(e) => setselectCategory(e.value)}
          options={ItemcategoryArr}
          optionLabel="name"
          placeholder="Select Category"
          className="w-full border border-gray-200 p-2.5 rounded-lg space-x-2.5 space-y-2.5 md:w-14rem"
        />
      </div>
      <div className="pt-28 text-center px-4">
        <motion.div
          className="text-[#e5ac55] font-bold text-5xl mb-4"
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Delicious Snacks
        </motion.div>
        <motion.p
          className="text-gray-700 text-lg font-semibold"
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          From savory bites to sweet treats — all in one place.
        </motion.p>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FilteredProducts.map((item, i) => (
            <motion.div
              key={item._id}
              className="rounded-xl  md:text-start text-center font-semibold  md:gap-5 gap-2.5 overflow-hidden flex-wrap justify-center items-start flex  shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center w-full justify-center  rounded-lg ">
                <img
                  src={item.img}
                  className="w-full aspect-square max-w-[400px] max-h-[300px] rounded-2xl"
                  alt=""
                />
              </div>

              <div className="flex text-start sm:pr-2.5 flex-col px-2.5 w-full">
                <p className="text-2xl font-bold">{item.title}</p>
                <p className="text-md">{item.des}</p>
                <span className="text-xl my-2.5 font-bold ">30.99 Rs </span>
                <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                  {checkIsProductAlreadyInCart(item) ? (
                    <button
                      onClick={() => navigate("/cart")}
                      className="w-1/2 p-2.5 cursor-pointer text-sm sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                    >
                      Go To Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(AddProductToCart({ ...item, quantity: 1 }));
                        AddProductToUserDetailsOnBackend({
                          ...item,
                          quantity: 1,
                        });
                      }}
                      className="w-1/2 cursor-pointer text-sm sm:text-lg p-2.5 bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
