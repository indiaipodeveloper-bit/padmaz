import React, { useState } from "react";
import { GiCupcake } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import padmaz from "../assets/logos/padmaz.png";
import { ImCross } from "react-icons/im";
import { BiMenuAltLeft } from "react-icons/bi";

const Header = () => {
  const [isSidebar, setisSidebar] = useState(false);
  const handleSidebarClick = () => {
    setisSidebar(false);
  };
  return (
    <>
      <div className="z-10 fixed w-0 top-0">
        <button
          onClick={() => setisSidebar(true)}
          className="fixed cursor-pointer z-10 left-5 top-5"
        >
          <BiMenuAltLeft className="text-4xl font-bold" />
        </button>

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
      <div className="sticky px-5 hidden sm:block py-2.5 top-0 z-20 bg- w-full bg-white border-b border-b-gray-200 ">
        <div className="max-w-7xl text-md md:text-lg lg:text-xl mx-auto h-[70px] overflow-hidden flex items-center justify-between transition-all z-50 duration-300">
          <div>
            <img src={padmaz} className="w-[100px]" alt="padmaz logo" />
          </div>
          <nav className="flex items-center gap-8">
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
            <Link
              to={"/menu"}
              className="hover:rounded-3xl hover:cursor-pointer cursor-pointer bg-[#bf2a28] rounded-lg transition-all duration-300 text-white px-6 py-3 font-bold hover:opacity-90"
            >
              Order Now
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
