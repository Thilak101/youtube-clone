import React from "react";
import "./navbar.css";
import { MdMic } from "react-icons/md";
import { HiOutlineBars3, HiMagnifyingGlass } from "react-icons/hi2";
import { BiVideoPlus } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import logo from "../../assets/youtube.png";
import { Link } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, setUser } from "../../slices/userSlice";

const Navbar = () => {
  const disptach = useDispatch();

  const user = useSelector(getUser);

  const handleLogin = async () => {
    const response = await signInWithPopup(auth, provider);
    disptach(setUser(response.user));
  };

  const handleLogout = async () => {
    disptach(logout());
    await signOut(auth);
  };

  return (
    <div
      className="
    bg-yt-black
    h-14
    flex 
    items-center 
    pl-4 
    pr-5 
    justify-between 
    fixed 
    w-full 
    z-10
    "
    >
      <div
        className="
     flex
     justify-between
     items-center
     "
      >
        <div
          className="
        text-yt-white
        p-2
        w-10
        text-2xl
        text-center
        hover:bg-yt-light-black
        rounded-full
        cursor-pointer
          "
        >
          <HiOutlineBars3 />
        </div>
        <div className="py-5 w-32 pr-3">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="object-contain" />
          </Link>
        </div>
      </div>

      <div
        className="
      h-10
      flex
      flex-row
      items-center
      m-auto"
      >
        <div
          className="
        w-[500px] 
        bg-yt-black 
        flex 
        border-yt-light-black 
        items-center
        rounded-3xl
        h-10
        border"
        >
          <input
            type="text"
            placeholder="search"
            className="
          w-full
          bg-yt-black
          h-6
          ml-6
          text-yt-white
          text-start
          focus:outline-none
          pl-4"
          />
          <button
            className="
          w-16 
          h-10 
          bg-yt-light-black
          px-1 py-0.5 
          rounded-r-3xl
          border-l-2
          border-yt-light-black"
          >
            <HiMagnifyingGlass
              size={22}
              className="text-yt-white inline-block text-center font-thin"
            />
          </button>
        </div>
        <div
          className="
        text-yt-white 
        bg-yt-light 
        w-10 
        h-10 
        items-center 
        flex
        justify-center
        rounded-full
        ml-4
        hover:bg-yt-light-black
        cursor-pointer"
        >
          <MdMic />
        </div>
      </div>
      <div className="item-center flex justify-center">
        <div className="flex flex-row items-center">
          <div className="mr-2 p-2 w-10 hover:bg-yt-light-black rounded-full cursor-pointer">
            <BiVideoPlus size={25} className="text-yt-white text-center" />
          </div>
          <div
            className="
          mx-3 
          p-3 
          w-10 
          hover:bg-yt-light-black
          rounded-full
          cursor-pointer"
          >
            <FaRegBell size={18} className="text-center text-yt-white" />
          </div>
          <div className="mx-3 items-center cursor-pointer">
            {!user ? (
              <button
                className="
              bg-yt-red
              py-1
              px-4
              text-yt-white
              rounded-md"
                onClick={handleLogin}
              >
                Sign-in
              </button>
            ) : (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="object-contain w-10 h-10 rounded-full"
                onClick={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
