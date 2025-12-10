import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, Heart, Star, Package, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhatWeDoButtonSpinIn() {

  const headingVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const cardVariant = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 12, duration: 0.6 },
    },
  };



  return (
    <div className="my-10 py-10 px-4 backdrop-blur-3xl bg-white/10 w-full max- mx-auto">
      <div className="text-center bg-white/10 mx-auto mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bf2a28] mb-4 shadow-lg">
          <ShoppingBag className="text-white" size={32} />
        </div>

        <motion.p
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-3"
        >
          What We Do
        </motion.p>

        <div className="w-24 h-1 bg-[#bf2a28] mx-auto rounded-full mb-6"></div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gray-600 text-lg max-w-3xl mx-auto mb-8"
        >
          Padmaz is a growing snack company that produces and sells high-quality
          bakery items such as rusk, toast, biscuits, cakes, cupcakes, bread,
          and sweets.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-gray-700 text-xl font-semibold max-w-2xl mx-auto"
        >
          We focus on freshness, taste, and premium quality while keeping
          pricing affordable.
        </motion.p>

        <div className="w-full flex flex-col justify-center items-center gap-2.5 my-5 gap-y-5">
          <Link
            to={"/menu"}
            className="bg-[#bf2a28] updown-animation rounded-xl min-w-[200px] w-[80%]  md:w-auto mt-5 hover:rounded-4xl transition-all duration-300 text-white px-10 py-4 text-xl font-bold hover:opacity-90 cursor-pointer"
          >
            View Menu
          </Link>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.18 }}
        className="grid grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
      >
        <motion.div
          variants={cardVariant}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center transform hover:-translate-y-2"
        >
          <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#e5ac55] transition-colors duration-300">
            <Heart className="text-white" size={28} />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">
            Homemade-Style Taste
          </p>
          <p className="text-gray-600">
            Authentic flavors that remind you of home
          </p>
        </motion.div>

        <motion.div
          variants={cardVariant}
          className="group bg-white  rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center transform hover:-translate-y-2"
        >
          <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#e5ac55] transition-colors duration-300">
            <Star className="text-white" size={28} />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">
            Consistent Freshness
          </p>
          <p className="text-gray-600">
            Baked fresh daily with premium ingredients
          </p>
        </motion.div>

        <motion.div
          variants={cardVariant}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center transform hover:-translate-y-2"
        >
          <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#e5ac55] transition-colors duration-300">
            <Package className="text-white" size={28} />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">
            Wide Product Variety
          </p>
          <p className="text-gray-600">
            Something delicious for every occasion
          </p>
        </motion.div>

        <motion.div
          variants={cardVariant}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center transform hover:-translate-y-2"
        >
          <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#e5ac55] transition-colors duration-300">
            <Users className="text-white" size={28} />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">
            For All Age Groups
          </p>
          <p className="text-gray-600">
            Loved by kids, adults, and seniors alike
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
