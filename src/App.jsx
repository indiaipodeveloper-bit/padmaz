import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Footer from "./layout/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import "./App.css";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import axios from "axios";
import { backendUrl } from "./assets/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/slices/AuthSlice";
import { toast } from "sonner";

const ProtectAuthRoute = ({ children }) => {
  const userinfo = useSelector((state) => state.auth.userinfo);
  return !!userinfo ? <Navigate to={"/"} /> : children;
};

const ProtectPrivateRoute = ({ children }) => {
  const userinfo = useSelector((state) => state.auth.userinfo);
  return !!userinfo ? children : <Navigate to={"/auth"}  />;
};

export default function App() {
  const userinfo = useSelector((state) => state.auth.userinfo);
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
        }
      } catch (error) {
        toast.error(error.response.data)
      }
    };

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

    if (!userinfo) {
      getUserDetails();
    }
  }, []);

  return (
    <>
      {location.pathname !== "/auth" && <Header />}

      <div className="min-h-screen">
        <Routes>
          <Route path="/*" element={<Navigate to={"/"} />} />
          <Route
            path="/"
            element={
              <ProtectPrivateRoute>
                <Home />
              </ProtectPrivateRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <ProtectAuthRoute>
                <Auth />
              </ProtectAuthRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectPrivateRoute>
                <Products />
              </ProtectPrivateRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <ProtectPrivateRoute>
                <Contact />
              </ProtectPrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectPrivateRoute>
                <About />
              </ProtectPrivateRoute>
            }
          />
        </Routes>
      </div>
      {location.pathname !== "/auth" && <Footer />}
    </>
  );
}
