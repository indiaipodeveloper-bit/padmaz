import axios from "axios";
import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { backendUrl } from "../assets/constant";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/AuthSlice";
import { toast } from "sonner";
import padmazLogo from "../assets/logos/padmaz.png";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateform = () => {
    if (!isLogin && !formData.name) {
      toast.error("Name is Required");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is Required");
      return false;
    }
    if (!isLogin && !formData.phone) {
      toast.error("Phone Number is Required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is Required");
      return false;
    }
    if (!isLogin && !formData.confirmPassword) {
      toast.error("Confirm Password is Required");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/signup`, formData, {
        withCredentials: true,
      });
      if (res.status == 200) {
        dispatch(setUserInfo(res.data.user));
        toast.success("Account Created");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, formData, {
        withCredentials: true,
      });
      if (res.status == 200) {
        dispatch(setUserInfo(res.data.user));
        toast.success("Logged In Successfully");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center overflow-x-hidden justify-center">
      <div className="w-full h-screen flex-wrap justify-center items-center gap-x-5 flex">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="w-40 h-40 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={padmazLogo} alt="" />
          </div>
          <p className="text-4xl font-bold text-amber-500 mb-2">
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </p>
          <p className="text-gray-600">
            {isLogin
              ? "Sign in to continue your delicious journey"
              : "Create an account to start ordering"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="">
          <div className="bg-white min-w-md rounded-2xl shadow-xl px-8 py-5 border border-amber-100">
            {/* Toggle Buttons */}
            <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
                  isLogin
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
                  !isLogin
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Input Fields */}
            <div className="space-y-5">
              {/* Name Field - Only for Signup */}
              {!isLogin && (
                <div className="transform transition-all duration-300">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-all duration-300"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-all duration-300"
                />
              </div>

              {!isLogin && (
                <>
                  <div className="transform transition-all duration-300">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 font-bold text-xl top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors cursor-pointer p-1"
                  >
                    {showPassword ? <FaEyeSlash className="" /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password - Only for Signup */}
              {!isLogin && (
                <>
                  <div className="transform transition-all duration-300">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors cursor-pointer p-1"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="" />
                        ) : (
                          <FaRegEye />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Forgot Password - Only for Login */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-amber-500 hover:text-amber-600 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={() => {
                  if (validateform()) {
                    isLogin ? handleLogin() : handleSignUp();
                  }
                }}
                className="w-full bg-red-600 hover:bg-amber-500 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:rounded-2xl shadow-lg hover:shadow-xl cursor-pointer text-lg"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </div>

            {/* <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-semibold text-gray-600">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 cursor-pointer">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-semibold text-gray-600">Facebook</span>
            </button>
          </div> */}
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-500 mt-6 mb-5 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 hover:text-amber-500 font-bold transition-colors cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
