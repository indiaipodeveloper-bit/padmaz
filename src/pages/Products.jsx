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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FilteredProducts.map((item, i) => (
            <motion.div
              key={item._id}
              className="rounded-xl p-8 flex flex-col items-center justify-between cursor-pointer shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300 bg-white"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-56 h-56 flex items-center rounded-lg justify-center overflow-hidden mb-6">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full  object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="text-2xl font-bold mb-2">{item.title}</div>
              <p className="text-gray-600 mb-4 text-center">
                {item.description}
              </p>
              <div className="flex items-center justify-between w-full mt-auto">
                <span className="text-2xl font-bold text-[#8b4513]">
                  {item.price}
                </span>

                {checkIsProductAlreadyInCart(item) ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="text-white bg-[#bf2a28] hover:bg-[#e5ac55] px-6 py-2 font-bold rounded-md transition cursor-pointer"
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
                    className="text-white bg-[#bf2a28] hover:bg-[#e5ac55] px-6 py-2 font-bold rounded-md transition cursor-pointer"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
