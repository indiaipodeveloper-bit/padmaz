import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import rusk from "../assets/products/rusk.png";
import bread from "../assets/products/bread.png";
import biscuits from "../assets/products/buscuits.png";
import cake from "../assets/products/cake.png";
import cupcakes from "../assets/products/cupcakes.png";
import sweets from "../assets/products/sweets.png";
import namkeen from "../assets/products/namkeen.png";
import breadlogo from "../assets/logos/breadLogo.png";

export default function Home() {
  let products = [
    {
      title: "Rusk",
      des: "Spicy Little Finger Toast",
      img: rusk,
    },
    {
      title: "Bread",
      des: "Happy Morning Bread, Royal Sliced Bread, Sunshine Sandwich Bread",
      img: bread,
    },
    {
      title: "Bakery Biscuits",
      des: "Meetha Namkeen Biscuit, Peanut Biscuits, Peanut Cookie",
      img: biscuits,
    },
    {
      title: "Cakes",
      des: "Butter Cake, Choco Cake, Cookies",
      img: cake,
    },
    {
      title: "Cup Cakes",
      des: "Chocolate Cup Cake, Red Velvet Cup Cake, Strawberry Cup Cake",
      img: cupcakes,
    },
    {
      title: "Sweets",
      des: "Doodh Malai Toast, Corn Bite",
      img: sweets,
    },
    {
      title: "Namkeen",
      des: "Namkeen Biscuits",
      img: namkeen,
    },
  ];

  // Random snack data for new sections
  const morningSnacks = [
    {
      title: "Butter Toast",
      des: "Crispy buttered toast perfect for mornings",
      img: rusk,
    },
    {
      title: "Fruit Bread",
      des: "Soft, sweet bread loaded with dry fruits",
      img: bread,
    },
    {
      title: "Tea Biscuits",
      des: "Light and crunchy biscuits for tea time",
      img: biscuits,
    },
  ];

  const eveningSnacks = [
    {
      title: "Chocolate Cake Slice",
      des: "Rich and moist chocolate delight",
      img: cake,
    },
    {
      title: "Mini Cup Cakes",
      des: "Soft and fluffy bite-size cupcakes",
      img: cupcakes,
    },
    {
      title: "Masala Namkeen Mix",
      des: "Crunchy, spicy evening snack mix",
      img: namkeen,
    },
  ];

  return (
    <div className="p-10 ">
      <div className="md:pt-2 px-4  text-center">
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center flex-col"
        >
          <p className="lg:text-6xl md:text-5xl transition-all duration-300 text-4xl text-[#e5ac55] font-bold my-5">
            Quality Is Our Priority
          </p>

          <div className="w-full flex flex-col justify-center items-center gap-2.5 gap-y-5">
            <img
              src={breadlogo}
              alt=""
              className="min-w-[200px] aspect-square animateUpDown"
            />
            <Link
              to={"/menu"}
              className="bg-[#bf2a28] rounded-xl w-full md:w-auto mt-5 hover:rounded-4xl transition-all duration-300 text-white px-10 py-4 text-xl font-bold hover:opacity-90 cursor-pointer"
            >
              View Menu
            </Link>
          </div>
        </motion.div>
      </div>

      <div id="menu" className="py-28 px-4">
        <motion.p
          className="lg:text-5xl md:text-5xl text-3xl font-bold mb-12 text-center"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Today’s Special
        </motion.p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((item) => (
            <motion.div
              key={item.des}
              className="rounded-xl p-8 overflow-hidden flex-wrap justify-center items-center flex gap-6  shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="md:w-36 md:h-36  flex items-center justify-center shrink-0 rounded-lg shadow-sm">
                <img
                  src={item.img}
                  className="w-full max-w-[300px] aspect-square"
                  alt=""
                />
              </div>

              <div className="flex-1">
                <p className="text-2xl font-bold mb-2">{item.title}</p>
                <p className="mb-3">{item.des}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg xl:text-2xl font-bold ">30.99 Rs </span>
                  <button className="text-white  bg-[#bf2a28] hover:bg-[#e5ac55] px-6 py-2 font-bold rounded-sm transition cursor-pointer">
                    Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MORNING SPECIALS --- */}

      <div className="py-20 px-4">
        <motion.p
          className="text-5xl font-bold mb-12 text-center text-[#e5ac55]"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Morning Specials
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {morningSnacks.map((item) => (
            <motion.div
              key={item.title}
              className="rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300 h-full min-h-[420px]"
              whileHover={{ scale: 1.03 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-40 h-40 object-contain mb-4"
              />
              <p className="text-2xl font-bold mb-2">{item.title}</p>
              <p className="text-gray-700 mb-6 grow">{item.des}</p>

              <button className="mt-auto w-full cursor-pointer bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300">
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- EVENING SPECIALS --- */}
      <div className="py-20 px-4">
        <motion.p
          className="text-5xl font-bold mb-12 text-center text-[#e5ac55]"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Evening Specials
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {eveningSnacks.map((item) => (
            <motion.div
              key={item.title}
              className="rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-40 h-40 object-contain mb-4"
              />
              <p className="text-2xl font-bold mb-2">{item.title}</p>
              <p className="text-gray-700 mb-6">{item.des}</p>
              <button className="w-full cursor-pointer bg-[#bf2a28] hover:bg-[#e5ac55] text-white font-bold py-3 rounded-md transition-all duration-300">
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
