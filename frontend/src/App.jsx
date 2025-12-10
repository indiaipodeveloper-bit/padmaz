import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Footer from "./layout/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import "./App.css";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import axios, { all } from "axios";
import { backendUrl } from "./assets/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/slices/AuthSlice";
import Checkout from "./pages/CheckOut";
import { SetCartItems } from "./redux/slices/CartSlice";
import { setAllProducts } from "./redux/slices/ProductSlice";
import CartPage from "./pages/CartPage";
import MyOrders from "./pages/MyOrders";
import SearchedProduct from "./pages/SearchedProduct";

const ProtectAuthRoute = ({ children }) => {
  const userinfo = useSelector((state) => state.auth.userinfo);
  // const userinfo = true;
  return !!userinfo ? <Navigate to={"/"} /> : children;
};

const ProtectPrivateRoute = ({ children }) => {
  const userinfo = useSelector((state) => state.auth.userinfo);
  // const userinfo = true;
  return !!userinfo ? children : <Navigate to={"/auth"} />;
};

export default function App() {
  const userinfo = useSelector((state) => state.auth.userinfo);
  const allProducts = useSelector((state) => state.products.allProducts);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/auth/user-info`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          dispatch(setUserInfo(res.data.user));
          dispatch(SetCartItems(res.data.user.productsInCart));
        }
      } catch (error) {}
    };

    const getAllProducts = async () => {
      const res = await axios.get(`${backendUrl}/api/products/all-products`, {
        withCredentials: true,
      });
      if (res.status == 200) {
        dispatch(setAllProducts(res.data.allProducts));
      }
    };

    if (!userinfo) {
      getUserDetails();
    }

    if (!allProducts.length) {
      getAllProducts();
    }

    // const lenis = new Lenis({
    //   duration: 2,
    //   smooth: true,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // });

    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);
  }, []);

  return (
    <>
      {location.pathname !== "/auth" && <Header />}

      <div className="min-h-screen">
        <Routes>
          <Route path="/*" element={<Navigate to={"/"} />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={
              <ProtectAuthRoute>
                <Auth />
              </ProtectAuthRoute>
            }
          />
          <Route path="/menu" element={<Products />} />

           <Route path="/search" element={<SearchedProduct />} />

          <Route
            path="/cart"
            element={
              <ProtectPrivateRoute>
                <CartPage />
              </ProtectPrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectPrivateRoute>
                <MyOrders />
              </ProtectPrivateRoute>
            }
          />
          <Route
            path="/check-out"
            element={
              <ProtectPrivateRoute>
                <Checkout />
              </ProtectPrivateRoute>
            }
          />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      {location.pathname !== "/auth" && <Footer />}
    </>
  );
}
