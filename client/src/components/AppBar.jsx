import { IoClose, IoPersonSharp } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/Register";
import { useState } from "react";
import SideMenu from "./SideMenu";
import { Auth } from "../context/authContext";
import ThemeToggle from "./themeToggle";
import { useTranslation } from "react-i18next";
import { HiMiniLanguage } from "react-icons/hi2";

function AppBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const { role, token, logout } = Auth();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className=" flex flex-row items-center w-full h-16 gap-1 justify-between px-3">
        <div className="flex  bg-transparent ">
          <Link to="/">
            <div className="text-3xl font-bold tracking-wide text-blue-700">
              E<span className="text-cyan-500">vent</span>
              <span className="italic text-[#04AA6D]">ra</span>
            </div>
          </Link>
        </div>

        {token && (
          <div className=" hidden md:flex flex-row items-center text-md gap-5  ">
            <Link to={"/"}>
              <div className="cursor-pointer group">
                <span className="relative">
                  {t("home")}
                  <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
                </span>
              </div>
            </Link>

           

            {role === "ADMIN" && (
              <Link to={"/admin"}>
                <div className="cursor-pointer group">
                  <span className="relative">
                    {t("dashboard")}
                    <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
                  </span>
                </div>
              </Link>
            )}

            <div
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              <div className="cursor-pointer group">
                <span className="relative">
                  {t("logout")}
                  <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row items-center gap-1 ">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 h-7"
          >
            <HiMiniLanguage size={20} />
            {i18n.language === "ar" ? "En" : "ar"}
          </button>
          <ThemeToggle />
          {!token && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:flex h-7"
            >
              <IoPersonSharp size={20} />
            </button>
          )}
        </div>

        <RiMenu3Line
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl cursor-pointer transition-transform duration-300 hover:scale-125 md:hidden ml-2 "
        />
      </nav>
      <SideMenu isOpen={isOpen}>
        <IoClose
          onClick={() => setIsOpen(false)}
          className=" w-7 h-7 cursor-pointer mr-auto"
        />
        {token ? (
          <>
            <div className="w-auto ">
              <ul className="py-2 text-sm  ">
                <li onClick={() => setIsOpen(false)}>
                  <Link
                    to={"/"}
                    className="block px-4 py-2 hover:bg-[#04AA6D] hover:text-white rounded-md text-xl"
                  >
                    {t("home")}
                  </Link>
                </li>
              
                {role === "ADMIN" && (
                  <li onClick={() => setIsOpen(false)}>
                    <Link
                      to={"/admin"}
                      className="block px-4 py-2 hover:bg-[#04AA6D] hover:text-white text-xl rounded-md"
                    >
                      {t("dashboard")}
                    </Link>
                  </li>
                )}
              </ul>
              <div className="h-[2px] bg-gray-200 w-full my-2"></div>

              <div
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block px-4 py-2  hover:bg-[#04AA6D] hover:text-white text-xl cursor-pointer rounded-md"
              >
                {t("logout")}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-10 flex flex-row gap-5 w-full">
              <div
                onClick={() => setSignIn(false)}
                className=" cursor-pointer group w-full flex justify-center"
              >
                <span className="relative select-none user-select-none">
                  <span> {t("register_account")}</span>
                  <span
                    className={`absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100
                        ${!signIn && "scale-x-100"}
                        `}
                  />
                </span>
              </div>
              <div
                onClick={() => setSignIn(true)}
                className=" cursor-pointer group w-full flex justify-center"
              >
                <span className="relative select-none user-select-none">
                  <span> {t("login")}</span>
                  <span
                    className={`absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                      signIn && "scale-x-100"
                    } `}
                  />
                </span>
              </div>
            </div>
            {signIn ? <SignIn /> : <SignUp />}
          </>
        )}
      </SideMenu>
    </>
  );
}

export default AppBar;
