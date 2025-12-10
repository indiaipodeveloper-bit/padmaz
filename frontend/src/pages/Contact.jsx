import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Contact() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [queryMessage, setqueryMessage] = useState("");
  const [phone, setphone] = useState("");
  const handleSendQuery = async () => {
    const res = await axios.post(
      // `http://localhost:3000/api/query`,
      `https://padmaz-backend.onrender.com/api/query`,
      { fullname, email, queryMessage, phone },
      { withCredentials: true }
    );
    if (res.status == 200) {
      alert("Successfull");
    }
  };
  const validateForm = () => {
    if (!fullname) {
      alert("Name is Required");
      return false;
    }

    if (!email) {
      alert("Email is required");
      return false;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return false;
    }

    if (!phone) {
      alert("Phone Number is required");
      return false;
    }

    if (
      phone.split("").every((e) => typeof parseInt(e) === Number) ||
      phone.length < 10
    ) {
      alert("Enter a valid Phone Number");
      return false;
    }

    const indianPhoneRegex = /^(?:\+91[\s-]?|0)?[6-9]\d{9}$/;

    if (!indianPhoneRegex.test(phone.trim())) {
      alert("Enter a valid Indian phone number");
      return false;
    }
    if (!queryMessage) {
      alert("Message is Required");
      return false;
    }
    return true;
  };
  return (
    <div className="min-h-screen  md:pt-28 pt-10 px-6  text-center">
      <motion.h1
        className="lg:text-6xl text-3xl sm:text-4xl font-bold my-10 text-[#e5ac55]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Let's Get In Touch
      </motion.h1>

      <motion.p
        className="text-[#8b4513]/90 text-lg mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        We'd love to hear from you! Whether it's feedback, custom orders, or
        just saying hi — drop us a message below 🍪
      </motion.p>

      <motion.div
        className="max-w-2xl mx-auto  p-10 rounded-xl shadow-md border border-[#8b4513]/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-5">
          <input
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="border border-[#8b4513]/20 rounded-lg px-5 py-3 focus:outline-none focus:border-[#e76f51] bg-white"
          />
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="border border-[#8b4513]/20 rounded-lg px-5 py-3 focus:outline-none focus:border-[#e76f51] bg-white"
          />
          <input
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            type="phone"
            placeholder="Phone Number"
            className="border border-[#8b4513]/20 rounded-lg px-5 py-3 focus:outline-none focus:border-[#e76f51] bg-white"
          />
          <textarea
            value={queryMessage}
            onChange={(e) => setqueryMessage(e.target.value)}
            placeholder="Your Query Message About any Product"
            rows="5"
            className="border border-[#8b4513]/20 rounded-lg px-5 py-3 focus:outline-none focus:border-[#e76f51] bg-white"
          ></textarea>
          <motion.button
            onClick={() => {
              if (validateForm()) {
                handleSendQuery();
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#bf2a28] rounded-xl w-full md:w-auto mt-5 hover:rounded-4xl transition-all duration-300 text-white px-10 py-3 text-xl font-bold hover:opacity-90 cursor-pointer"
          >
            Send Message
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="mt-16 "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-lg font-semibold">
          📍 123 Bliss Street, Pastry Town
        </p>
        <p className="text-lg font-semibold">📞 +91 98765 43210</p>
        <p className="text-lg font-semibold">✉️ hello@bitebliss.com</p>
      </motion.div>
    </div>
  );
}
