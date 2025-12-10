import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import { backendUrl, ItemcategoryArr, products } from "../assets/constant";
import { AddProductToCart } from "../redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

export default function Products() {
  const user = useSelector((state) => state.auth.userinfo);
  const isAuthenticated = !!user;
  const allProducts = useSelector((state) => state.products.allProducts) ?? [];
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const AddProductToUserDetailsOnBackend = (bodyitem = {}) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
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

  const checkIsProductAlreadyInCart = (e) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    let item = cartItems.find((item) => {
      return item._id == e._id;
    });
    if (!!item) {
      return true;
    }
    return false;
  };

  const [search, setsearch] = useState("");

  return (
    <div className="min-h-screen overflow-hidden ">
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
        <div className="">
          <div className="text-5xl text-[#bf2a28] font-bold text-center my-5">
            <p className="">Toast</p>
          </div>
          <div className="bg-red-">
            <Carousel className="w-[90%] mx-auto">
              <CarouselContent className="-ml-1">
                {allProducts
                  .filter((e) => e.category.includes("toast"))
                  .map((item, i) => (
                    <CarouselItem
                      key={item._id}
                      className="pl-1 md:basis-1/2 xl:basis-1/3"
                    >
                      <div
                        key={item._id}
                        className="rounded-xl  min-h-[250px] md:text-start text-center font-semibold md:flex-nowrap gap-x-5 overflow-hidden flex-wrap justify-center items-center flex shadow-md p-5 hover:shadow-2xl border border-[#8b4513]/10 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-full my-auto  rounded-lg ">
                          <img
                            src={`${backendUrl}/uploads/products/${item.img}`}
                            className="w-full aspect-square md:w-[150px] max-w-[300px] max-h-[300px] rounded-2xl"
                            alt=""
                          />
                        </div>

                        <div className="flex text-start min-h-[250px] flex-col justify-between h-full   w-full">
                          <div className="">
                            <p className="text-xl font-bold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                            <p className="text-xl flex  items-center my-2.5 font-bold">
                              <span>
                                <FaRupeeSign />
                              </span>
                              {item.price}
                            </p>
                          </div>
                          <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                            {checkIsProductAlreadyInCart(item) ? (
                              <button
                                onClick={() => navigate("/cart")}
                                className="cursor-pointer w-full text-sm sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Go To Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  dispatch(
                                    AddProductToCart({ ...item, quantity: 1 })
                                  );
                                  AddProductToUserDetailsOnBackend({
                                    ...item,
                                    quantity: 1,
                                  });
                                }}
                                className="w-full cursor-pointer text-sm sm:text-lg  bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="">
          <div className="text-5xl text-[#bf2a28] font-bold text-center my-5">
            <p className="">Cakes</p>
          </div>
          <div className="bg-red-">
            <Carousel className="w-[90%] mx-auto">
              <CarouselContent className="-ml-1">
                {allProducts
                  .filter((e) => e.category.includes("cake"))
                  .map((item, i) => (
                    <CarouselItem
                      key={item._id}
                      className="pl-1 md:basis-1/2 xl:basis-1/3"
                    >
                      <div
                        key={item._id}
                        className="rounded-xl  min-h-[250px] md:text-start text-center font-semibold md:flex-nowrap gap-x-5 overflow-hidden flex-wrap justify-center items-center flex shadow-md p-5 hover:shadow-2xl border border-[#8b4513]/10 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-full my-auto  rounded-lg ">
                          <img
                            src={`${backendUrl}/uploads/products/${item.img}`}
                            className="w-full aspect-square md:w-[150px] max-w-[300px] max-h-[300px] rounded-2xl"
                            alt=""
                          />
                        </div>

                        <div className="flex text-start min-h-[250px] flex-col justify-between h-full   w-full">
                          <div className="">
                            <p className="text-xl font-bold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                            <p className="text-xl flex  items-center my-2.5 font-bold ">
                              <span>
                                <FaRupeeSign />
                              </span>
                              {item.price}
                            </p>
                          </div>
                          <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                            {checkIsProductAlreadyInCart(item) ? (
                              <button
                                onClick={() => navigate("/cart")}
                                className="cursor-pointer w-full text-sm sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Go To Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  dispatch(
                                    AddProductToCart({ ...item, quantity: 1 })
                                  );
                                  AddProductToUserDetailsOnBackend({
                                    ...item,
                                    quantity: 1,
                                  });
                                }}
                                className="w-full cursor-pointer text-sm sm:text-lg  bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="">
          <div className="text-5xl text-[#bf2a28] font-bold text-center my-5">
            <p className="">Cookies</p>
          </div>
          <div className="">
            <Carousel className="w-[90%] mx-auto">
              <CarouselContent className="-ml-1">
                {allProducts
                  .filter((e) => e.category.includes("cookies"))
                  .map((item, i) => (
                    <CarouselItem
                      key={item._id}
                      className="pl-1 md:basis-1/2 xl:basis-1/3"
                    >
                      <div
                        key={item._id}
                        className="rounded-xl  min-h-[250px] md:text-start text-center font-semibold md:flex-nowrap gap-x-5 overflow-hidden flex-wrap justify-center items-center flex shadow-md p-5 hover:shadow-2xl border border-[#8b4513]/10 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-full my-auto  rounded-lg ">
                          <img
                            src={`${backendUrl}/uploads/products/${item.img}`}
                            className="w-full aspect-square md:w-[150px] max-w-[300px] max-h-[300px] rounded-2xl"
                            alt=""
                          />
                        </div>

                        <div className="flex text-start min-h-[250px] flex-col justify-between h-full   w-full">
                          <div className="">
                            <p className="text-xl font-bold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                            <p className="text-xl flex  items-center my-2.5 font-bold ">
                              <span>
                                <FaRupeeSign />
                              </span>
                              {item.price}
                            </p>
                          </div>
                          <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                            {checkIsProductAlreadyInCart(item) ? (
                              <button
                                onClick={() => navigate("/cart")}
                                className="cursor-pointer w-full text-sm sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Go To Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  dispatch(
                                    AddProductToCart({ ...item, quantity: 1 })
                                  );
                                  AddProductToUserDetailsOnBackend({
                                    ...item,
                                    quantity: 1,
                                  });
                                }}
                                className="w-full cursor-pointer text-sm sm:text-lg  bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="">
          <div className="text-5xl text-[#bf2a28] font-bold text-center my-5">
            <p className="">Toast</p>
          </div>
          <div className="bg-red-">
            <Carousel className="w-[90%] mx-auto">
              <CarouselContent className="-ml-1">
                {allProducts
                  .filter((e) => e.category.includes("toast"))
                  .map((item, i) => (
                    <CarouselItem
                      key={item._id}
                      className="pl-1 md:basis-1/2 xl:basis-1/3"
                    >
                      <div
                        key={item._id}
                        className="rounded-xl  min-h-[250px] md:text-start text-center font-semibold md:flex-nowrap gap-x-5 overflow-hidden flex-wrap justify-center items-center flex shadow-md p-5 hover:shadow-2xl border border-[#8b4513]/10 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-full my-auto  rounded-lg ">
                          <img
                            src={`${backendUrl}/uploads/products/${item.img}`}
                            className="w-full aspect-square md:w-[150px] max-w-[300px] max-h-[300px] rounded-2xl"
                            alt=""
                          />
                        </div>

                        <div className="flex text-start min-h-[250px] flex-col justify-between h-full   w-full">
                          <div className="">
                            <p className="text-xl font-bold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                            <p className="text-xl flex  items-center my-2.5 font-bold ">
                              <span>
                                <FaRupeeSign />
                              </span>
                              {item.price}
                            </p>
                          </div>
                          <div className="flex flex-col my-2.5 gap-2.5 justify-between">
                            {checkIsProductAlreadyInCart(item) ? (
                              <button
                                onClick={() => navigate("/cart")}
                                className="cursor-pointer w-full text-sm sm:text-lg bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Go To Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  dispatch(
                                    AddProductToCart({ ...item, quantity: 1 })
                                  );
                                  AddProductToUserDetailsOnBackend({
                                    ...item,
                                    quantity: 1,
                                  });
                                }}
                                className="w-full cursor-pointer text-sm sm:text-lg  bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
