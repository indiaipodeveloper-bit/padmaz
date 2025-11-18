import React from "react";
import { motion } from "framer-motion";
import { FaHandHoldingUsd, FaBalanceScale, FaChartLine, FaFileInvoice, FaCalendarAlt } from "react-icons/fa";

export default function About() {
  const info = [
    {
      icon: <FaHandHoldingUsd className="text-[#e5ac55] text-4xl" />,
      title: "Nature of Business",
      value: "Manufacturer",
    },
    {
      icon: <FaBalanceScale className="text-[#e5ac55] text-4xl" />,
      title: "Legal Status of Firm",
      value: "Limited Company",
    },
    {
      icon: <FaChartLine className="text-[#e5ac55] text-4xl" />,
      title: "Annual Turnover",
      value: "5 - 25 Cr",
    },
    {
      icon: <FaFileInvoice className="text-[#e5ac55] text-4xl" />,
      title: "GST Number",
      value: "19AAGCP6807R1ZK",
    },
    {
      icon: <FaCalendarAlt className="text-[#e5ac55] text-4xl" />,
      title: "GST Registration Date",
      value: "01-07-2017",
    },
  ];

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6 py-24">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <p className="text-gray-700 font-semibold text-lg">
          Padma Nutri Health Products Pvt. Ltd. - Manufacturer of rusk toast, breads and bakery biscuits since 2014 in Raiganj, West Bengal.
        </p>
      </motion.div>

      {/* Info Cards */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {info.map((item, i) => (
          <motion.div
            key={item.title}
            className="flex flex-col items-center justify-center text-center bg-white shadow-md hover:shadow-xl rounded-2xl p-8 border border-[#8b4513]/10 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{item.icon}</div>
            <p className="font-semibold text-gray-600 mb-1">{item.title}</p>
            <p className="text-xl font-bold text-[#8b4513]">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
