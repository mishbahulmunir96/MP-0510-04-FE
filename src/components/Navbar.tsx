"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsCalendar2Event } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("user-storage");
    // action saat logout button diklik
    dispatch(logoutAction());
    // saat logout akan kembali ke login page
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-blue-900 p-4 shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <p className="animate-bounce text-4xl font-extrabold text-white hover:text-blue-400">
            MAKÉT
          </p>
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-white">
        <Link href="/create-event">
          <p className="flex items-center space-x-2 transition duration-300 hover:text-gray-300">
            <BsCalendar2Event />
            <span>Create Event</span>
          </p>
        </Link>

        <Link href="/my-ticket">
          <p className="flex items-center space-x-2 transition duration-300 hover:text-gray-300">
            <GrCart />
            <span>My ticket</span>
          </p>
        </Link>

        <Link href="/explore-event">
          <p className="flex items-center space-x-2 transition duration-300 hover:text-gray-300">
            <IoRocketSharp />
            <span>Explore</span>
          </p>
        </Link>
      </div>

      {!user.id && (
        <div className="flex items-center space-x-4 text-white">
          <Link href="/register">
            <p className="rounded-md border border-white px-5 py-2 transition-colors duration-300 hover:bg-white hover:text-blue-900">
              Register
            </p>
          </Link>
          <Link href="/login">
            <p className="rounded-md border border-white bg-blue-700 px-6 py-2 transition-colors duration-300 hover:bg-blue-600">
              Login
            </p>
          </Link>
        </div>
      )}

      {!!user.id && (
        <Link href="/login" onClick={logout}>
          <p className="rounded-md border border-white bg-blue-700 px-6 py-2 transition-colors duration-300 hover:bg-blue-600">
            Logout
          </p>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
