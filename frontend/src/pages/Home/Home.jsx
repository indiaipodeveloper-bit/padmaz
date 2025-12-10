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
import { useDispatch, useSelector } from "react-redux";
import { AddProductToCart } from "../../redux/slices/CartSlice";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { backendUrl } from "../../assets/constant";
import { toast } from "sonner";
import ProductionAndSales from "./components/ProductsAndSell";
import ProductsWeServe from "./components/WhatPrductsWeSell";
import OurGoals from "./components/OurGoals";
import Reviews from "./components/Reviews";
import WhatWeDo from "./components/WhatWeDo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

export const checkIsProductAlreadyInCart = (e) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const images = import.meta.glob("/src/assets/bgs/*.{png,jpg,jpeg}", {
    eager: true,
  });
  const imageList = Object.values(images).map((img) => img.default);
  let item = cartItems.find((item) => {
    return item.title == e.title;
  });
  if (!!item) {
    return true;
  }
  return false;
};

export const AddProductToUserDetailsOnBackend = (bodyitem = {}) => {
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
  }, 1500);
};

// add to cart in users's data  on backend

export default function Home() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.userinfo);
  const isAuthenticated = !!user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const images = import.meta.glob("/src/assets/bgs/*.{png,jpg,jpeg}", {
    eager: true,
  });
  const imageList = Object.values(images).map((img) => img.default);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const checkIsProductAlreadyInCart = (e) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    let item = cartItems.find((item) => {
      return item._id == e._id;
    });
    if (!!item) {
      return true;
    }
    return false;
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
    <div className="p-2 overflow-hidden">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {imageList.map((e, i) => (
            <CarouselItem key={i}>
              <div className="max-h-[650px] rounded-2xl bg-cover bg-no-repeat flex justify-center">
                <img
                  src={e}
                  alt=""
                  className="max-h-[650px] rounded-2xl w-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="md:pt-2 px-4 my-5 text-center">
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

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((item, i) => {
            if (i == products.length - 1) {
              return;
            }
            return (
              <motion.div
                key={item.des}
                className="rounded-xl  md:text-start text-center font-semibold sm:flex-nowrap  md:gap-5 overflow-hidden flex-wrap  justify-center items-start flex  shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ y: 40 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center w-full justify-center p-2.5 rounded-lg ">
                  <img
                    src={item.img}
                    className="w-full aspect-square max-h-[100px] max-w-[100px] sm:max-w-[400px] sm:max-h-[300px] rounded-2xl"
                    alt=""
                  />
                </div>

                <div className="flex text-start sm:pr-2.5 flex-col px-5 w-full">
                  <p className="text-sm sm:text-xl font-bold">{item.title}</p>
                  <p className="text-xs sm:text-sm">{item.des}</p>
                  <span className="text-sm my-2.5 sm:text-lg font-bold ">
                    30.99 Rs{" "}
                  </span>
                  <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                    {checkIsProductAlreadyInCart(item) ? (
                      <button
                        onClick={() => navigate("/cart")}
                        className="p-2.5 cursor-pointer text-sm w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
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
                        className="p-2.5 cursor-pointer text-sm w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {morningSnacks.map((item) => (
            <motion.div
              key={item.des}
              className="rounded-xl  md:text-start text-center font-semibold sm:flex-nowrap  md:gap-5 overflow-hidden flex-wrap  justify-center items-start flex  shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center w-full justify-center p-2.5 rounded-lg ">
                <img
                  src={item.img}
                  className="w-full aspect-square max-h-[100px] max-w-[100px] sm:max-w-[400px] sm:max-h-[300px] rounded-2xl"
                  alt=""
                />
              </div>

              <div className="flex text-start sm:pr-2.5 flex-col px-5 w-full">
                <p className="text-sm sm:text-xl font-bold">{item.title}</p>
                <p className="text-xs sm:text-sm">{item.des}</p>
                <span className="text-sm my-2.5 sm:text-lg font-bold ">
                  30.99 Rs{" "}
                </span>
                <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                  {checkIsProductAlreadyInCart(item) ? (
                    <button
                      onClick={() => navigate("/cart")}
                      className="p-2.5 cursor-pointer text-sm w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
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
                      className="p-2.5 cursor-pointer text-sm w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
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

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {eveningSnacks.map((item) => (
            <motion.div
              key={item.des}
              className="rounded-xl  md:text-start text-center font-semibold sm:flex-nowrap  md:gap-5 overflow-hidden flex-wrap  justify-center items-start flex  shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center w-full justify-center p-2.5 rounded-lg ">
                <img
                  src={item.img}
                  className="w-full aspect-square max-h-[100px] max-w-[100px] sm:max-w-[400px] sm:max-h-[300px] rounded-2xl"
                  alt=""
                />
              </div>

              <div className="flex text-start sm:pr-2.5 flex-col px-5 w-full">
                <p className="text-sm sm:text-xl font-bold">{item.title}</p>
                <p className="text-xs sm:text-sm">{item.des}</p>
                <span className="text-sm my-2.5 sm:text-lg font-bold ">
                  30.99 Rs{" "}
                </span>
                <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                  {checkIsProductAlreadyInCart(item) ? (
                    <button
                      onClick={() => navigate("/cart")}
                      className="p-2.5 cursor-pointer text-sm w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
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
                      className="p-2.5 cursor-pointer text-xs w-full sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
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
