import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Products() {
  const images = import.meta.glob("/src/assets/products/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const imageList = Object.values(images).map((img) => img.default);
  // const products = [
  //   {
  //     title: "Bread",
  //     des: "Soft and freshly baked classic bread loaf.",
  //     img: "/src/assets/bread.png",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Buscuits",
  //     des: "Crunchy and tasty biscuits perfect for tea time.",
  //     img: "/src/assets/buscuits.png",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Buttercake",
  //     des: "Rich buttery cake with a smooth and moist texture.",
  //     img: "/src/assets/buttercake.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Cake",
  //     des: "Delicious and fluffy cake perfect for any celebration.",
  //     img: "/src/assets/cake.png",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Choco Cake",
  //     des: "Soft chocolate cake with deep cocoa flavor.",
  //     img: "/src/assets/chococake.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Choco Cupcake",
  //     des: "Moist chocolate cupcake topped with creamy frosting.",
  //     img: "/src/assets/chococupcake.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Cracker Rusk",
  //     des: "Crispy twice-baked rusk with a crunchy bite.",
  //     img: "/src/assets/crackerRusk.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Cupcakes",
  //     des: "Sweet and soft cupcakes with delightful flavor.",
  //     img: "/src/assets/cupcakes.png",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Elaichi Rusk",
  //     des: "Flavorful rusk infused with the aroma of cardamom.",
  //     img: "/src/assets/elaichirusk.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Elaiichi Toast",
  //     des: "Crispy toast flavored with aromatic elaiichi.",
  //     img: "/src/assets/elaiichiToast.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Finger Toast",
  //     des: "Long crispy toast strips perfect for dipping.",
  //     img: "/src/assets/fingertoast.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Fruit Cake",
  //     des: "Classic fruit cake loaded with dry fruits and flavor.",
  //     img: "/src/assets/fruitcake.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Jeera Rusk",
  //     des: "Light rusk enhanced with the taste of jeera.",
  //     img: "/src/assets/jeerarusk.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Milk Toast",
  //     des: "Delicious toasted bread with a hint of milk sweetness.",
  //     img: "/src/assets/milktoast.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Namkeen",
  //     des: "Savory and crunchy snack mix ideal for munching.",
  //     img: "/src/assets/namkeen.png",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Normal Transfat Rusk",
  //     des: "Light and crispy transfat-free rusk.",
  //     img: "/src/assets/normaltransfatrusk.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Orange Cupcake",
  //     des: "Fresh orange-flavored cupcake with a citrus punch.",
  //     img: "/src/assets/orangecupcake.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Rusk",
  //     des: "Classic golden-brown rusk perfect with tea.",
  //     img: "/src/assets/rusk.png",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Sauf Rusk",
  //     des: "Crispy rusk flavored with aromatic saunf.",
  //     img: "/src/assets/saufrusk.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Spice Toast",
  //     des: "Toast infused with a warm mix of spices.",
  //     img: "/src/assets/spicetoast.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Spicy Toast",
  //     des: "Crunchy toast with a spicy flavor kick.",
  //     img: "/src/assets/spicytoast.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Strawberry Cupcake",
  //     des: "Sweet cupcake made with real strawberry flavor.",
  //     img: "/src/assets/strawcupcake.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Sweets",
  //     des: "Traditional Indian sweets made with love.",
  //     img: "/src/assets/sweets.png",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Toast",
  //     des: "Crispy golden toast perfect for breakfast.",
  //     img: "/src/assets/toast.jpeg",
  //     price: "Rs 100",
  //   },
  //   {
  //     title: "Transfat Rusk",
  //     des: "Healthy rusk with no transfat added.",
  //     img: "/src/assets/transfatrusk.jpeg",
  //     price: "Rs 100",
  //   },
  // ];

  const [products, setproducts] = useState([
    {
      title: "Bread",
      des: "Soft and freshly baked classic bread loaf.",
      img: "/src/assets/bread.png",
      price: "Rs 100",
    },
    {
      title: "Buscuits",
      des: "Crunchy and tasty biscuits perfect for tea time.",
      img: "/src/assets/buscuits.png",
      price: "Rs 100",
    },
    {
      title: "Buttercake",
      des: "Rich buttery cake with a smooth and moist texture.",
      img: "/src/assets/buttercake.jpeg",
      price: "Rs 100",
    },
    {
      title: "Cake",
      des: "Delicious and fluffy cake perfect for any celebration.",
      img: "/src/assets/cake.png",
      price: "Rs 100",
    },
    {
      title: "Choco Cake",
      des: "Soft chocolate cake with deep cocoa flavor.",
      img: "/src/assets/chococake.jpeg",
      price: "Rs 100",
    },
    {
      title: "Choco Cupcake",
      des: "Moist chocolate cupcake topped with creamy frosting.",
      img: "/src/assets/chococupcake.jpeg",
      price: "Rs 100",
    },
    {
      title: "Cracker Rusk",
      des: "Crispy twice-baked rusk with a crunchy bite.",
      img: "/src/assets/crackerRusk.jpeg",
      price: "Rs 100",
    },
    {
      title: "Cupcakes",
      des: "Sweet and soft cupcakes with delightful flavor.",
      img: "/src/assets/cupcakes.png",
      price: "Rs 100",
    },
    {
      title: "Elaichi Rusk",
      des: "Flavorful rusk infused with the aroma of cardamom.",
      img: "/src/assets/elaichirusk.jpeg",
      price: "Rs 100",
    },
    {
      title: "Elaiichi Toast",
      des: "Crispy toast flavored with aromatic elaiichi.",
      img: "/src/assets/elaiichiToast.jpeg",
      price: "Rs 100",
    },
    {
      title: "Finger Toast",
      des: "Long crispy toast strips perfect for dipping.",
      img: "/src/assets/fingertoast.jpeg",
      price: "Rs 100",
    },
    {
      title: "Fruit Cake",
      des: "Classic fruit cake loaded with dry fruits and flavor.",
      img: "/src/assets/fruitcake.jpeg",
      price: "Rs 100",
    },
    {
      title: "Jeera Rusk",
      des: "Light rusk enhanced with the taste of jeera.",
      img: "/src/assets/jeerarusk.jpeg",
      price: "Rs 100",
    },
    {
      title: "Milk Toast",
      des: "Delicious toasted bread with a hint of milk sweetness.",
      img: "/src/assets/milktoast.jpeg",
      price: "Rs 100",
    },
    {
      title: "Namkeen",
      des: "Savory and crunchy snack mix ideal for munching.",
      img: "/src/assets/namkeen.png",
      price: "Rs 100",
    },
    {
      title: "Normal Transfat Rusk",
      des: "Light and crispy transfat-free rusk.",
      img: "/src/assets/normaltransfatrusk.jpeg",
      price: "Rs 100",
    },
    {
      title: "Orange Cupcake",
      des: "Fresh orange-flavored cupcake with a citrus punch.",
      img: "/src/assets/orangecupcake.jpeg",
      price: "Rs 100",
    },
    {
      title: "Rusk",
      des: "Classic golden-brown rusk perfect with tea.",
      img: "/src/assets/rusk.png",
      price: "Rs 100",
    },
    {
      title: "Sauf Rusk",
      des: "Crispy rusk flavored with aromatic saunf.",
      img: "/src/assets/saufrusk.jpeg",
      price: "Rs 100",
    },
    {
      title: "Spice Toast",
      des: "Toast infused with a warm mix of spices.",
      img: "/src/assets/spicetoast.jpeg",
      price: "Rs 100",
    },
    {
      title: "Spicy Toast",
      des: "Crunchy toast with a spicy flavor kick.",
      img: "/src/assets/spicytoast.jpeg",
      price: "Rs 100",
    },
    {
      title: "Strawberry Cupcake",
      des: "Sweet cupcake made with real strawberry flavor.",
      img: "/src/assets/strawcupcake.jpeg",
      price: "Rs 100",
    },
    {
      title: "Sweets",
      des: "Traditional Indian sweets made with love.",
      img: "/src/assets/sweets.png",
      price: "Rs 100",
    },
    {
      title: "Toast",
      des: "Crispy golden toast perfect for breakfast.",
      img: "/src/assets/toast.jpeg",
      price: "Rs 100",
    },
    {
      title: "Transfat Rusk",
      des: "Healthy rusk with no transfat added.",
      img: "/src/assets/transfatrusk.jpeg",
      price: "Rs 100",
    },
  ]);
  const [search, setsearch] = useState("");

  const FilteredProducts = products.filter((e) => e.title.includes(search));

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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FilteredProducts.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-xl p-8 flex flex-col items-center justify-between cursor-pointer shadow-md hover:shadow-2xl border border-[#8b4513]/10 hover:-translate-y-2 transition-all duration-300 bg-white"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-56 h-56 flex items-center justify-center overflow-hidden mb-6">
                <img
                  src={imageList[i]}
                  alt={item.title}
                  className="w-full h-full  object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="text-2xl font-bold mb-2">{item.title}</div>
              <p className="text-gray-600 mb-4 text-center">{item.des}</p>
              <div className="flex items-center justify-between w-full mt-auto">
                <span className="text-2xl font-bold text-[#8b4513]">
                  {item.price}
                </span>
                <button className="text-white bg-[#bf2a28] hover:bg-[#e5ac55] px-6 py-2 font-bold rounded-md transition cursor-pointer">
                  Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
