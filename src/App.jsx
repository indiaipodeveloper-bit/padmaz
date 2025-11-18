import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Footer from "./layout/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import "./App.css";
import Products from "./pages/Products";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
        <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="/*" element={<Navigate to={"/"} />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Products />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
        <Footer />
    </>
  );
}
