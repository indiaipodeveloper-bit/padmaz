import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function CustomerReviewsDeckSpread() {
  // All cards start in same exact position, then spread into place
  const cardVariant = {
    hidden: {
      opacity: 0,
      x: -120,
      y: -40,
      scale: 0.9,
      position: "absolute",
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      position: "relative",
      transition: {
        delay: i * 0.25, // one-by-one spreading
        type: "spring",
        stiffness: 70,
        damping: 14,
      },
    }),
  };

  const headingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  // Cards data (not dynamic rendering — still static JSX, just using array for index)
  const cards = [0, 1, 2, 3];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto relative">

      {/* Heading */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bf2a28] mb-4 shadow-lg">
          <Star className="text-white" size={32} />
        </div>

        <motion.p
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-3"
        >
          Customer Reviews
        </motion.p>

        <div className="w-24 h-1 bg-[#bf2a28] mx-auto rounded-full mb-6"></div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-1">
            <Star className="w-8 h-8 fill-[#e5ac55]" />
            <Star className="w-8 h-8 fill-[#e5ac55]" />
            <Star className="w-8 h-8 fill-[#e5ac55]" />
            <Star className="w-8 h-8 fill-[#e5ac55]" />
            <Star className="w-8 h-8 fill-[#e5ac55]" />
          </div>
          <span className="text-3xl font-bold text-gray-800 ml-2">4.8/5</span>
        </div>

        <p className="text-gray-600">Based on customer feedback</p>
      </div>

      {/* GRID (spread target layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">

        {/* Card 1 */}
        <motion.div
          custom={0}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex gap-1 mb-4">
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
          </div>
          <p className="text-gray-700 mb-4 italic">
            "Padmaz products are fresh and delicious — the rusk and cookies taste homemade!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#bf2a28] rounded-full flex items-center justify-center text-white font-bold">RS</div>
            <div>
              <p className="font-bold text-gray-800">Rajesh Sharma</p>
              <p className="text-sm text-gray-600">Regular Customer</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          custom={1}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex gap-1 mb-4">
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
          </div>
          <p className="text-gray-700 mb-4 italic">
            "Best quality snacks! My family loves the cakes and cupcakes."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#bf2a28] rounded-full flex items-center justify-center text-white font-bold">PK</div>
            <div>
              <p className="font-bold text-gray-800">Priya Kapoor</p>
              <p className="text-sm text-gray-600">Repeat Customer</p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          custom={2}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex gap-1 mb-4">
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 text-[#e5ac55]" />
          </div>
          <p className="text-gray-700 mb-4 italic">
            "Perfect for my tea stall. Customers love the rusk and biscuits!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#bf2a28] rounded-full flex items-center justify-center text-white font-bold">AV</div>
            <div>
              <p className="font-bold text-gray-800">Amit Verma</p>
              <p className="text-sm text-gray-600">Wholesale Buyer</p>
            </div>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          custom={3}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex gap-1 mb-4">
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
            <Star className="w-5 h-5 fill-[#e5ac55]" />
          </div>
          <p className="text-gray-700 mb-4 italic">
            "Cupcakes are always a hit at every birthday party!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#bf2a28] rounded-full flex items-center justify-center text-white font-bold">SK</div>
            <div>
              <p className="font-bold text-gray-800">Sneha Kumar</p>
              <p className="text-sm text-gray-600">Event Customer</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
