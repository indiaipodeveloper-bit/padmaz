import React, { useRef, useState } from "react";
import { GiCupcake } from "react-icons/gi";
import { Link, NavLink, useLocation } from "react-router-dom";
import padmaz from "../assets/logos/padmaz.png";
import { ImCross } from "react-icons/im";
import { BiMenuAltLeft } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { backendUrl } from "../assets/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUserInfo } from "../redux/slices/AuthSlice";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../pages/Cart/Cart";

const Header = () => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isSidebar, setisSidebar] = useState(false);
  const dispatch = useDispatch();
  const handleSidebarClick = () => {
    setisSidebar(false);
  };
  const searchInputRef = useRef(null);
  const [isSearchForSmallScreens, setisSearchForSmallScreens] = useState(false);
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status == 200) {
        toast.success(res.data);
        dispatch(setUserInfo(undefined));
      }
    } catch (error) {
      dispatch(setUserInfo(undefined));
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <div className="z-50 fixed w-0 top-0">
        {/* --------------------sidebar------------------------  */}
        <div
          className={`min-h-screen sm:hidden border-r bg-white border-gray-300 transition-all py-10 duration-500 bg- ${
            isSidebar ? "translate-x-0" : "-translate-x-[250px]"
          } z-10 min-w-[250px] w-[250px] md:hidden top-0 left-0 relative`}
        >
          <button
            onClick={() => setisSidebar(false)}
            className="absolute right-5 top-5 cursor-pointer"
          >
            <ImCross className="text-2xl" />
          </button>

          <div className="flex flex-col justify-center items-center">
            <div>
              <img src={padmaz} className="w-[150px]" alt="padmaz logo" />
            </div>
            <div className="flex flex-col w-full justify-center items-center gap-y-8">
              <NavLink
                onClick={handleSidebarClick}
                to={"/"}
                className={({ isActive }) =>
                  `p-1 relative before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0 before:bg-red-500 before:transition-all duration-300 font-semibold transition ${
                    isActive ? "before:w-full " : "before:w-0"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                onClick={handleSidebarClick}
                to={"/menu"}
                className={({ isActive }) =>
                  `p-1 relative before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0 before:bg-red-500 before:transition-all duration-300 font-semibold transition ${
                    isActive ? "before:w-full " : "before:w-0"
                  }`
                }
              >
                Menu
              </NavLink>
              <NavLink
                onClick={handleSidebarClick}
                to={"/about"}
                className={({ isActive }) =>
                  `p-1 relative before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0 before:bg-red-500 before:transition-all duration-300 font-semibold transition ${
                    isActive ? "before:w-full " : "before:w-0"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                onClick={handleSidebarClick}
                to={"/contact-us"}
                className={({ isActive }) =>
                  `p-1 relative before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0 before:bg-red-500 before:transition-all font-semibold  ${
                    isActive ? "before:w-full " : "before:w-0"
                  }`
                }
              >
                Contact
              </NavLink>
              <Link
                onClick={handleSidebarClick}
                to={"/menu"}
                className="hover:rounded-3xl cursor-pointer bg-[#bf2a28] rounded-lg transition-all duration-300 text-white px-6 py-3 font-bold hover:opacity-90"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------top bar -------------------------------- */}
      <div className="sticky px-5 py-2.5 top-0 z-20  bg- w-full bg-white border-b border-b-gray-200 ">
        <div className="w-full sm:w-full gap-x-5 text-md md:text-lg lg:text-xl  mx-auto h-[70px] overflow-hidden flex items-center justify-between transition-all z-50 duration-300">
          <button
            onClick={() => setisSidebar(true)}
            className=" cursor-pointer sm:hidden z-10 left-5 top-5"
          >
            <BiMenuAltLeft className="text-4xl font-bold" />
          </button>
          <div className="flex justify-center  items-center gap-4">
            <div className="hidden sm:flex">
              <img
                src={padmaz}
                className="min-w-[90px] resize max-w-[110px]"
                alt="padmaz logo"
              />
            </div>
            <nav className="hidden sm:flex items-center gap-5">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `p-1 relative before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0  hover:before:w-full ${
                    !isActive && "hover:before:bg-gray-300"
                  } before:transition-all duration-300 font-semibold transition ${
                    isActive ? "before:w-full before:bg-red-500" : "before:w-0"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/menu"}
                className={({ isActive }) =>
                  `p-1 relative hover:before:w-full ${
                    !isActive && "hover:before:bg-gray-300"
                  } before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0 before:transition-all duration-300 font-semibold transition ${
                    isActive ? "before:w-full before:bg-red-500" : "before:w-0"
                  }`
                }
              >
                Menu
              </NavLink>
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `p-1 relative hover:before:w-full ${
                    !isActive && "hover:before:bg-gray-300"
                  } before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0 before:transition-all duration-300 font-semibold transition ${
                    isActive ? "before:w-full before:bg-red-500" : "before:w-0"
                  }`
                }
              >
                About
              </NavLink>

              <NavLink
                to={"/contact-us"}
                className={({ isActive }) =>
                  `p-1 relative hover:before:w-full ${
                    !isActive && "hover:before:bg-gray-300"
                  } before:content-[''] before:absolute before:h-0.5 before:left-0 before:bottom-0  before:transition-all duration-300 font-semibold transition ${
                    isActive ? "before:w-full before:bg-red-500" : "before:w-0"
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center justify-end w-1/2 gap-5">
            <div
              className={`[@media(min-width:885px)]:w-[70%] ${
                isSearchForSmallScreens && "min-w-[200px]"
              } lg:w-[50%] flex rounded-full border-gray-200 border`}
            >
              <input
                onBlur={() => setisSearchForSmallScreens(false)}
                placeholder="Search Products..."
                ref={searchInputRef}
                type="text"
                className={`[@media(min-width:885px)]:p-2.5 w-0 ${
                  isSearchForSmallScreens && "w-full p-2.5 px-5"
                } [@media(min-width:885px)]:w-full outline-none border-none [@media(min-width:885px)]:px-5`}
              />
              <button
                onClick={() => {
                  if (window.innerWidth < 885) {
                    setisSearchForSmallScreens(true);
                    searchInputRef.current.focus();
                  }
                }}
                className="text-2xl p-2.5 px-3 hover:bg-gray-200 bg-gray-100 cursor-pointer rounded-full"
              >
                <FiSearch />
              </button>
            </div>
            <Cart
              isDrawerOpen={isDrawerOpen}
              setisDrawerOpen={setisDrawerOpen}
            />

            {location.pathname !== "/check-out" && (
              <button
                onClick={(e) => setisDrawerOpen(!isDrawerOpen)}
                className={`cursor-pointer ${
                  isSearchForSmallScreens && "hidden"
                } hover:bg-gray-200 transition-all duration-150 p-2 rounded-full relative`}
              >
                <FaShoppingCart className="text-2xl" />
                {!!cartItems.length && (
                  <div className="h-5 w-5 absolute bg-[#bf2a28] text-white rounded-full -right-1 bottom-0 flex text-sm  justify-center items-center">
                    {cartItems.length}
                  </div>
                )}
              </button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer " asChild>
                <Button
                  variant="outline"
                  className={`${
                    isSearchForSmallScreens && "hidden"
                  } outline-none border-none`}
                >
                  <BsThreeDotsVertical className="" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-transparent p-0 w-0 flex justify-center items-center outline-none border-none">
                <Button
                  className={
                    "cursor-pointer w-full absolute right-5 top-5 rounded-lg font-bold"
                  }
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
