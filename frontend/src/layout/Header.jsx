import React, { useRef, useState } from "react";
import { GiCupcake } from "react-icons/gi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import Cart from "../pages/Cart/Cart";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userinfo);
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isSidebar, setisSidebar] = useState(false);
  const dispatch = useDispatch();
  const handleSidebarClick = () => {
    setisSidebar(false);
  };
  const [isLoading, setisLoading] = useState(true);
  const debounceRef = useRef(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [SearchedProducts, setSearchedProducts] = useState([]);
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

  const GetSearchedProducts = async (searchValue) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/products/searchProducts`,
        { searchTerm: searchValue },
        { withCredentials: true }
      );
      if (res.status == 200) {
        if (!res.data.searchedProducts.length) {
          setisLoading(false);
          setSearchedProducts([]);
        } else {
          setSearchedProducts(res.data.searchedProducts);
        }
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="z-50 fixed w-0 top-0">
        {/* --------------------sidebar------------------------  */}
        <div
          className={`min-h-screen n sm:hidden border-r bg-white i border-gray-300 transition-all k py-10 duration-500 h bg- ${
            isSidebar ? "translate-x-0" : "-translate-x-[250px]"
          } z-10 i min-w-[250px] w-[250px] md:hidden top-0 left-0 l relative`}
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
      <div className="sticky n py-2.5 px-2.5 top-0 z-20  bg- w-full i bg-white border border-b-gray-200 k">
        <div className="w-full h sm:w-full gap-x-5 i text-md md:text-lg lg:text-xl  mx-auto h-[70px] overflow-hidden l flex items-center justify-between transition-all z-50  duration-300">
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
                onBlur={() => {
                  setisSearchForSmallScreens(false);
                }}
                placeholder="Search Products..."
                ref={searchInputRef}
                onChange={(e) => {
                  setisLoading(true);
                  setsearchTerm(e.target.value);

                  if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                  }
                  if (!e.target.value.length) {
                    setSearchedProducts([]);
                    return;
                  }

                  debounceRef.current = setTimeout(() => {
                    GetSearchedProducts(e.target.value);
                  }, 2000);
                }}
                value={searchTerm}
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

            {!!user ? (
              <>
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
                  <DropdownMenuContent className="bg-transparent my-2.5 p-0 w-0 flex flex-col mr-5 justify-center items-center outline-none border-none">
                    <Button
                      className={
                        "cursor-pointer w-full border-b border-b-gray-600 rounded-none font-bold"
                      }
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <Button
                      onClick={() => navigate("/orders")}
                      className={"cursor-pointer w-full rounded-none font-bold"}
                    >
                      My Orders
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link
                to={"/auth"}
                className="bg-[#bf2a28] text-center  rounded-full w-[100px]  hover:rounded-4xl transition-all duration-300 text-white p-2.5 text-lg font-bold hover:opacity-90 cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="absolute bg-white w-full left-0">
          {!SearchedProducts.length || !searchTerm.length ? (
            <>
              {searchTerm.length !== 0 && (
                <div className="w-full flex justify-center items-center h-[100px]">
                  <p className="text-xl font-bold">
                    {isLoading ? "Searching..." : "No Products Found !"}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5 overflow-y-auto overflow-x-hidden max-h-[400px]  justify-center place-items-center  gap-5">
                {SearchedProducts.map((e) => (
                  <div
                    key={e._id}
                    className="sm:max-h-[150px] sm:max-w-[250px] w-full hover:scale-[1.1] gap-x-1  p-1  cursor-pointer text-center sm:border-none border-b flex  transition-all duration-300"
                  >
                    <div className="flex items-center justify-center h-full  rounded-lg ">
                      <img
                        src={`${backendUrl}/uploads/products/${e.img}`}
                        className="w-full aspect-square min-w-[100px] max-w-[100px] max-h-[100px] rounded-2xl"
                        alt=""
                      />
                    </div>

                    <div className="flex text-start flex-col  justify-between">
                      <div className="">
                        <p className="text-sm font-bold">{e.title}</p>
                        <p className="text-sm">{e.description}</p>
                        <p className=" flex text-sm items-center  font-semibold ">
                          <span>
                            <FaRupeeSign />
                          </span>
                          {e.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full  flex justify-center items-center py-2.5">
                <button
                  onClick={() => {
                    setsearchTerm("");
                    setTimeout(() => {
                      navigate(`/search?product=${searchTerm}`, {
                        state: SearchedProducts,
                      });
                    }, 500);
                  }}
                  className="bg-[#bf2a28] hover:cursor-pointer transition-all duration-300  hover:rounded-4xl  hover:opacity-90 text-white  p-2.5 text-lg rounded-lg w-full sm:w-1/2"
                >
                  View Results
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
