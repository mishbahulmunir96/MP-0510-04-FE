"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlices";
import Link from "next/link";
import { BsCalendar2Event } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("user-storage");
    dispatch(logoutAction());
  };

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-blue-400 p-4 shadow-lg">

      <div className="flex items-center">
        <Link href="/">
          <p className="text-3xl font-extrabold text-white">MAKÉT</p>
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-white">
        {!!user.id && (
          <Link href="/create-event">
            <p className="ttext-white flex items-center space-x-2 transition duration-300 hover:text-gray-300">
              <BsCalendar2Event />
              <span>Create Event</span>
            </p>
          </Link>
        )}

        <Link href="/my-ticket">
          <p className="flex items-center space-x-2 text-white transition duration-300 hover:text-gray-300">
            <GrCart />
            <span>My ticket</span>
          </p>
        </Link>

        <Link href="/explore-event">
          <p className="flex items-center space-x-2 text-white transition duration-300 hover:text-gray-300">
            <IoRocketSharp />
            <span>Explore</span>
          </p>
        </Link>
      </div>

      {!user.id && (
        <div className="flex items-center space-x-4 text-white">
          <Link href="/register">
            <p className="text-white transition duration-300 hover:text-gray-300">
              Register
            </p>
          </Link>
          <Link href="/login">
            <p className="text-white transition duration-300 hover:text-gray-300">
              Login
            </p>

          </Link>
        </div>
      )}

      {!!user.id && (
        <Link href="/login" onClick={logout}>
          <p className="text-white transition duration-300 hover:text-gray-300">
            Logout
          </p>

        </Link>
      )}
    </nav>
  );
};

export default Navbar;
