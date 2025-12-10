import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function ProductionAndSalesFull() {
  const reduce = useReducedMotion();

  const parentTwoCol = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.20,
      },
    },
  };

  const leftToRight = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
        duration: 0.65,
      },
    },
  };

  const rightToLeft = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
        duration: 0.65,
      },
    },
  };

  const headingVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: "easeOut",
      },
    },
  };

  const bottomToTop = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const twoColParentProps = reduce
    ? { initial: "visible", whileInView: "visible", viewport: { once: true } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: parentTwoCol };

  const headingProps = reduce
    ? { initial: false, whileInView: "visible", viewport: { once: true } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: headingVariant };

  const salesGridParentProps = reduce
    ? { initial: "visible", whileInView: "visible", viewport: { once: true } }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
        variants: { visible: { transition: { staggerChildren: 0.18 } } },
      };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bf2a28] mb-4 shadow-lg">
          <TrendingUp className="text-white" size={32} />
        </div>

        <motion.p
          {...headingProps}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-3"
        >
          How Much We Produce & Sell
        </motion.p>

        <div className="w-24 h-1 bg-[#bf2a28] mx-auto rounded-full mb-6" />
      </div>
      <motion.div {...twoColParentProps} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
       
        <motion.div
          {...(reduce ? {} : { variants: leftToRight })}
          className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-[#bf2a28]"
        >
          <motion.div
            {...(reduce ? {} : { variants: headingVariant })}
            className="flex items-center gap-3 mb-6"
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-3xl">🏭</span>
            <p className="text-2xl font-bold text-gray-800">Daily Production</p>
          </motion.div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-semibold">Current Production:</span>
              <span className="text-2xl font-bold text-[#bf2a28]">___ kg/units</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-semibold">Scalable Capacity:</span>
              <span className="text-2xl font-bold text-[#e5ac55]">___ kg/units</span>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              With better machinery and space, we can significantly increase our production capacity
            </p>
          </div>
        </motion.div>

        {/* RIGHT (Daily Sales) */}
        <motion.div
          {...(reduce ? {} : { variants: rightToLeft })}
          className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-[#e5ac55]"
        >
          <motion.div
            {...(reduce ? {} : { variants: headingVariant })}
            className="flex items-center gap-3 mb-6"
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-3xl">💰</span>
            <p className="text-2xl font-bold text-gray-800">Daily Sales</p>
          </motion.div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-semibold">Daily Sales Volume:</span>
              <span className="text-2xl font-bold text-[#bf2a28]">___ kg/units</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-semibold">Monthly Revenue:</span>
              <span className="text-2xl font-bold text-[#e5ac55]">₹_____</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Sales Channels - Bottom -> Top staggered */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <motion.p
          {...headingProps}
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
        >
          Sales Channels
        </motion.p>

        <motion.div
          {...salesGridParentProps}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            {...(reduce ? {} : { variants: bottomToTop })}
            className="text-center p-6 bg-gray-50 rounded-xl hover:bg-[#bf2a28] hover:text-white transition-all duration-300 group"
          >
            <div className="text-4xl mb-3">🚶</div>
            <p className="font-bold">Direct Local Customers</p>
          </motion.div>

          <motion.div
            {...(reduce ? {} : { variants: bottomToTop })}
            className="text-center p-6 bg-gray-50 rounded-xl hover:bg-[#bf2a28] hover:text-white transition-all duration-300 group"
          >
            <div className="text-4xl mb-3">🏬</div>
            <p className="font-bold">Retail Shops</p>
          </motion.div>

          <motion.div
            {...(reduce ? {} : { variants: bottomToTop })}
            className="text-center p-6 bg-gray-50 rounded-xl hover:bg-[#bf2a28] hover:text-white transition-all duration-300 group"
          >
            <div className="text-4xl mb-3">📦</div>
            <p className="font-bold">Wholesale Buyers</p>
          </motion.div>

          <motion.div
            {...(reduce ? {} : { variants: bottomToTop })}
            className="text-center p-6 bg-gray-50 rounded-xl hover:bg-[#bf2a28] hover:text-white transition-all duration-300 group"
          >
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-bold">Bulk Orders for Events</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
