import React from "react";
import { motion } from "framer-motion";
import {
  FaHandHoldingUsd,
  FaBalanceScale,
  FaChartLine,
  FaFileInvoice,
  FaCalendarAlt,
} from "react-icons/fa";
import padmaz from "../assets/logos/padmaz.png";

export default function About() {
  const info = [
    {
      icon: <FaHandHoldingUsd className="text-[#e5ac55] text-4xl" />,
      title: "Factory Address",
      value: " Soharoi More, Madhupur, Raiganj-733134, Uttar Dinajpur, W.B.",
    },
    {
      icon: <FaBalanceScale className="text-[#e5ac55] text-4xl" />,
      title: "Office Address",
      value: " Padma Villa, School Road, Raiganj-733134, Uttar Dianjpur W.B.",
    },
    {
      icon: <FaChartLine className="text-[#e5ac55] text-4xl" />,
      title: "Email",
      value: " padmanutriproducts@gmail.com",
    },
    {
      icon: <FaFileInvoice className="text-[#e5ac55] text-4xl" />,
      title: "Customer Care No",
      value: "09635827447",
    },
  ];

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-start max-w-3xl"
      >
        <div className="max-h-[350px] m-auto max-w-[350px]">
          <img src={padmaz} className="object-cover" alt="Padmaz Logo" />
        </div>
        <p className="text-gray-700 font-semibold text-lg">
          P.N.H.P Padma'z started it's journey a decades back. The ain was to
          create quality and wholesome goodness products. Our directors had
          always the vision to give the best quality and nutrition products.
        </p>
        <p className="text-gray-700 font-semibold text-lg">
          Padma is growing and developing with a variety of products in cookies,
          cakes, rusk, bread. The company's seeks constant love and support from
          it's distributors to grow with a promise to make healthier and better
          products .
        </p>
      </motion.div>

      {/* Info Cards */}
      <div className="my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {info.map((item, i) => (
          <motion.div
            key={item.title}
            className="flex min-h-[300px] flex-col items-center justify-center text-center bg-white shadow-md hover:shadow-xl rounded-2xl p-8 border border-[#8b4513]/10 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{item.icon}</div>
            <p className="font-semibold text-gray-600 mb-1">{item.title}</p>
            <p className="text-lg font-bold text-[#8b4513]">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
