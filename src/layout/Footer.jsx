import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      className=" py-10 border-t bg-[#bf2a28] text-white border-[#f8f1e2]/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="mb-6">
          Follow us for sweet updates, new treats, and special offers!
        </p>

        <div className=" socials text-3xl z-50 justify-center gap-6 flex items-center mb-8">
          <Link
            to="/"
            className="transition-all  p-2 hover:bg-[#e5ac55] rounded-full cursor-pointer hover:rotate-360  duration-500"
          >
            <FaInstagram className="socials" />
          </Link>
          <Link
            to="/"
            className="transition-all  p-2 hover:bg-[#e5ac55] rounded-full cursor-pointer hover:rotate-360 duration-500"
          >
            <FaFacebookF className="socials" />
          </Link>
          <Link
            to="/"
            className="transition-all  p-2 hover:bg-[#e5ac55] rounded-full cursor-pointer hover:rotate-360 duration-500"
          >
            <FaTwitter className="socials " />
          </Link>
        </div>

        <div className="border-t border-[#f8f1e2]/20 pt-6 text-sm">
          © {new Date().getFullYear()} footer
          <br />
          footer
        </div>
      </div>
    </motion.footer>
  );
}
