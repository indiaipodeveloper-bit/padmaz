import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Target } from "lucide-react";

export default function OurGoals() {
  const reduce = useReducedMotion();

  const parentTwoCol = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };

  const leftToRight = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 14, duration: 0.7 },
    },
  };

  const rightToLeft = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 14, duration: 0.7 },
    },
  };

  const headingVariant = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: "easeOut" },
    },
  };

  const twoColProps = reduce
    ? { initial: "visible", whileInView: "visible", viewport: { once: true } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: parentTwoCol };

  const headingProps = reduce
    ? { initial: false, whileInView: "visible", viewport: { once: true } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: headingVariant };

  return (
    <motion.div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bf2a28] mb-4 shadow-lg">
            <Target className="text-white" size={32} />
          </div>

          <motion.p {...headingProps} className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Our Goals
          </motion.p>

          <div className="w-24 h-1 bg-[#bf2a28] mx-auto rounded-full mb-6" />
        </div>

        <motion.div {...twoColProps} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Short-Term Goals (comes from left) */}
          <motion.div
            {...(reduce ? {} : { variants: leftToRight })}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <motion.div
              {...(reduce ? {} : { variants: headingVariant })}
              className="flex items-center gap-3 mb-6"
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#bf2a28] rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">Short-Term Goals</p>
            </motion.div>

            <p className="text-gray-600 mb-6 font-semibold">Next 6–12 Months</p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#e5ac55] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Increase production capacity</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#e5ac55] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Improve packaging & branding</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#e5ac55] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Expand supply to more shops and cafés</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#e5ac55] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">
                  Launch new product variations (cookies, flavored rusks, etc.)
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#e5ac55] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Strengthen Instagram & offline marketing</span>
              </li>
            </ul>
          </motion.div>

          {/* Right: Long-Term Goals (comes from right) */}
          <motion.div
            {...(reduce ? {} : { variants: rightToLeft })}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <motion.div
              {...(reduce ? {} : { variants: headingVariant })}
              className="flex items-center gap-3 mb-6"
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#e5ac55] rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">Long-Term Goals</p>
            </motion.div>

            <p className="text-gray-600 mb-6 font-semibold">1–3 Years</p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#bf2a28] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="text-gray-700">Build our own production unit for higher output</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#bf2a28] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="text-gray-700">Expand into nearby cities</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#bf2a28] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="text-gray-700">Launch premium snack and sweet lines</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#bf2a28] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="text-gray-700">Achieve strong recurring wholesale partnerships</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#bf2a28] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="text-gray-700">Increase production to industrial levels</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#bf2a28] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="text-gray-700">
                  Make a strong presence in the market through branding, taste consistency, and wide distribution
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
