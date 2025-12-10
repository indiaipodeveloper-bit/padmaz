// ProductsWeServe.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function ProductsWeServe() {
  const reduce = useReducedMotion();

  // Products: left -> right
  const productsContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.20 } }, // slower stagger
  };

  const leftToRight = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 14, duration: 0.65 },
    },
  };

  // We Serve: right -> left (we'll use negative stagger direction so rightmost card animates first)
  const weServeContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18, staggerDirection: -1 }, // RIGHTMOST first
    },
  };

  const rightToLeft = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 14, duration: 0.65 },
    },
  };

  // Headings: slower fade + slide up
  const headingVariant = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: "easeOut" } },
  };

  // fallback props when reduced motion is preferred
  const productsContainerProps = reduce
    ? { initial: "visible", whileInView: "visible", viewport: { once: true } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: productsContainer };

  const weServeContainerProps = reduce
    ? { initial: "visible", whileInView: "visible", viewport: { once: true } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: weServeContainer };

  const headingProps = reduce
    ? { initial: false, whileInView: "visible", viewport: { once: true } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: headingVariant };

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bf2a28] mb-4 shadow-lg">
            <ShoppingBag className="text-white" size={32} />
          </div>

          <motion.p {...headingProps} className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            What Products We Sell
          </motion.p>

          <div className="w-24 h-1 bg-[#bf2a28] mx-auto rounded-full mb-6" />
        </div>

        {/* PRODUCTS GRID (Left → Right) */}
        <motion.div {...productsContainerProps} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-12">
          <motion.div variants={reduce ? {} : leftToRight} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <span className="text-4xl mb-3">🍪</span>
            <p className="font-bold text-gray-800">Rusk</p>
          </motion.div>

          <motion.div variants={reduce ? {} : leftToRight} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <span className="text-4xl mb-3">🍞</span>
            <p className="font-bold text-gray-800">Toast</p>
          </motion.div>

          <motion.div variants={reduce ? {} : leftToRight} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <span className="text-4xl mb-3">🥨</span>
            <p className="font-bold text-gray-800">Biscuits</p>
          </motion.div>

          <motion.div variants={reduce ? {} : leftToRight} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <span className="text-4xl mb-3">🎂</span>
            <p className="font-bold text-gray-800">Cakes</p>
          </motion.div>

          <motion.div variants={reduce ? {} : leftToRight} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <span className="text-4xl mb-3">🧁</span>
            <p className="font-bold text-gray-800">Cupcakes</p>
          </motion.div>

          <motion.div variants={reduce ? {} : leftToRight} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <span className="text-4xl mb-3">🥖</span>
            <p className="font-bold text-gray-800">Breads</p>
          </motion.div>

          <motion.div variants={reduce ? {} : leftToRight} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
            <span className="text-4xl mb-3">🍬</span>
            <p className="font-bold text-gray-800">Sweets</p>
          </motion.div>
        </motion.div>

        {/* WE SERVE (Right → Left, rightmost card first) */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <motion.p {...headingProps} className="text-2xl font-bold text-gray-800 mb-6 text-center">
            We Serve
          </motion.p>

          <motion.div {...weServeContainerProps} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* DOM order remains left-to-right; staggerDirection: -1 makes the rightmost start first */}
            <motion.div variants={reduce ? {} : rightToLeft} className="text-center p-4">
              <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">👥</span>
              </div>
              <p className="font-bold text-gray-800">Daily Customers</p>
              <p className="text-gray-600 text-sm mt-2">Individual buyers who love our fresh products</p>
            </motion.div>

            <motion.div variants={reduce ? {} : rightToLeft} className="text-center p-4">
              <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🏪</span>
              </div>
              <p className="font-bold text-gray-800">Retail Shops</p>
              <p className="text-gray-600 text-sm mt-2">Local stores that stock our products</p>
            </motion.div>

            <motion.div variants={reduce ? {} : rightToLeft} className="text-center p-4">
              <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">☕</span>
              </div>
              <p className="font-bold text-gray-800">Tea Stalls & Cafés</p>
              <p className="text-gray-600 text-sm mt-2">Perfect companions for beverages</p>
            </motion.div>

            <motion.div variants={reduce ? {} : rightToLeft} className="text-center p-4">
              <div className="w-16 h-16 bg-[#bf2a28] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📦</span>
              </div>
              <p className="font-bold text-gray-800">Wholesale Buyers</p>
              <p className="text-gray-600 text-sm mt-2">Bulk orders for events and businesses</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
