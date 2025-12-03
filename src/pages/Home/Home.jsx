import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import rusk from "../../assets/products/rusk.png";
import bread from "../../assets/products/bread.png";
import biscuits from "../../assets/products/buscuits.png";
import cake from "../../assets/products/cake.png";
import cupcakes from "../../assets/products/cupcakes.png";
import sweets from "../../assets/products/sweets.png";
import namkeen from "../../assets/products/namkeen.png";
import breadlogo from "../../assets/logos/breadLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { AddProductToCart } from "../../redux/slices/CartSlice";
import axios from "axios";
import { backendUrl } from "../../assets/constant";
import { toast } from "sonner";
import {
  Heart,
  Package,
  ShoppingBag,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import ProductionAndSales from "./components/ProductsAndSell";
import ProductsWeServe from "./components/WhatPrductsWeSell";
import OurGoals from "./components/OurGoals";
import Reviews from "./components/Reviews";
import WhatWeDo from "./components/WhatWeDo";

export const checkIsProductAlreadyInCart = (e) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  let item = cartItems.find((item) => {
    return item.title == e.title;
  });
  if (!!item) {
    return true;
  }
  return false;
};

// add to cart in users's data  on backend
export function AddProductToUserDetailsOnBackend(bodyitem = {}) {
  setTimeout(async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/add-to-cart`,
        { item: bodyitem },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  }, 3000);
}

export default function Home() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parent = {
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const leftToRight = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const rightToLeft = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  let products = [
    {
      title: "Rusk",
      des: "Spicy Little Finger Toast",
      img: rusk,
      price: 40,
    },
    {
      title: "Bread",
      des: "Happy Morning Bread, Royal Sliced Bread, Sunshine Sandwich Bread",
      img: bread,
      price: 30,
    },
    {
      title: "Bakery Biscuits",
      des: "Meetha Namkeen Biscuit, Peanut Biscuits, Peanut Cookie",
      img: biscuits,
      price: 50,
    },
    {
      title: "Cakes",
      des: "Butter Cake, Choco Cake, Cookies",
      img: cake,
      price: 120,
    },
    {
      title: "Cup Cakes",
      des: "Chocolate Cup Cake, Red Velvet Cup Cake, Strawberry Cup Cake",
      img: cupcakes,
      price: 25,
    },
    {
      title: "Sweets",
      des: "Doodh Malai Toast, Corn Bite",
      img: sweets,
      price: 60,
    },
    {
      title: "Namkeen",
      des: "Namkeen Biscuits",
      img: namkeen,
      price: 35,
    },
  ];

  // Random snack data for new sections
  const morningSnacks = [
    {
      title: "Butter Toast",
      des: "Crispy buttered toast perfect for mornings",
      img: rusk,
      price: 20,
    },
    {
      title: "Fruit Bread",
      des: "Soft, sweet bread loaded with dry fruits",
      img: bread,
      price: 35,
    },
    {
      title: "Tea Biscuits",
      des: "Light and crunchy biscuits for tea time",
      img: biscuits,
      price: 25,
    },
  ];

  const eveningSnacks = [
    {
      title: "Chocolate Cake Slice",
      des: "Rich and moist chocolate delight",
      img: cake,
      price: 45,
    },
    {
      title: "Mini Cup Cakes",
      des: "Soft and fluffy bite-size cupcakes",
      img: cupcakes,
      price: 30,
    },
    {
      title: "Masala Namkeen Mix",
      des: "Crunchy, spicy evening snack mix",
      img: namkeen,
      price: 40,
    },
  ];

  return (
    <div className="p-2">
      <div className="md:pt-2 px-4  text-center">
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center flex-col"
        >
          <p className="lg:text-6xl md:text-5xl transition-all duration-300 text-4xl text-[#e5ac55] font-bold">
            Quality Is Our Priority
          </p>
        </motion.div>
      </div>

      <WhatWeDo />

      <ProductsWeServe />

      <div id="menu" className="py-10">
        <motion.p
          className="lg:text-5xl md:text-5xl text-3xl font-bold mb-12 text-center"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Today’s Special
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((item) => (
            <motion.div
              key={item.des}
              className="rounded-xl  md:text-start text-center font-semibold  md:gap-5 gap-2.5 overflow-hidden flex-wrap justify-center items-start flex  shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center w-full justify-center p-2.5 rounded-lg ">
                <img
                  src={item.img}
                  className="w-full aspect-square max-w-[400px] max-h-[300px] rounded-2xl"
                  alt=""
                />
              </div>

              <div className="flex text-start sm:pr-2.5 flex-col px-5 w-full">
                <p className="text-xl font-bold">{item.title}</p>
                <p className="text-[15px]">{item.des}</p>
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

      {/* --- MORNING SPECIALS --- */}

      <div className="px-4">
        <motion.p
          className="text-3xl font-bold mb-12 text-center text-[#e5ac55]"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Morning Specials
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10">
          {morningSnacks.map((item) => (
            <motion.div
              key={item.des}
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

              <div className="flex text-start sm:pr-2.5 flex-col px-5 w-full ">
                <p className="text-xl font-bold">{item.title}</p>
                <p className="text-[15px]">{item.des}</p>
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

      {/* --- EVENING SPECIALS --- */}
      <div className="py-10 ">
        <motion.p
          className="text-4xl font-bold my-10 text-center text-[#e5ac55]"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Evening Specials
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10">
          {eveningSnacks.map((item) => (
            <motion.div
              key={item.des}
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

              <div className="flex text-start sm:pr-2.5 flex-col px-5 w-full ">
                <p className="text-xl font-bold">{item.title}</p>
                <p className="text-[15px]">{item.des}</p>
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

      <ProductionAndSales />

      <OurGoals />

      <Reviews />
    </div>
  );
}
