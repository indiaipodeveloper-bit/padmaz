import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AddProductToUserDetailsOnBackend,
  checkIsProductAlreadyInCart,
} from "./Home/Home";
import { AddProductToCart } from "../redux/slices/CartSlice";
import { useDispatch } from "react-redux";
import { backendUrl } from "../assets/constant";
const SearchedProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  if (!location.state) {
    navigate("/");
  }
  const searchedProducts = location.state || [];
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const productName = searchParams.get("product");
  return (
    <div className="p-10 sm:ml-10">
      <div className="text-start text-3xl py-10">
        <p className="capitalize font-bold">Showing Result For {productName}</p>{" "}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {searchedProducts.map((item) => (
          <motion.div
            key={item._id}
            className="rounded-xl p-2.5 md:text-start text-center font-semibold sm:flex-nowrap md:gap-5 overflow-hidden flex-wrap justify-center items-start flex shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center max-w-[200px] max-h-[200px] w-full justify-center p-2.5 rounded-lg ">
              <img
                src={`${backendUrl}/uploads/products/${item.img}`}
                className="w-full aspect-square rounded-2xl"
                alt=""
              />
            </div>
            <div className="flex text-start sm:pr-2.5 flex-col px-5 w-full">
              <p className="text-[18px] sm:text-xl font-bold">{item.title}</p>
              <p className="text-[15px] sm:text-lg">{item.description}</p>{" "}
              <span className="text-lg my-2 sm:text-xl font-bold ">
                Rs {item.price}
              </span>
              <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                {checkIsProductAlreadyInCart(item) ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="p-2.5 cursor-pointer text-sm sm:w-[200px] w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
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
                    className="p-2.5 cursor-pointer text-sm sm:w-[200px] w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
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
  );
};
export default SearchedProduct;
