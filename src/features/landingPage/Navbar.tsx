import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { BsCalendar2Event } from "react-icons/bs";
import { GrCart } from "react-icons/gr";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 flex items-center justify-between p-4">
    
      <div className="flex items-center">
        <Link href="/">
        <p className="text-white font-bold text-4xl animate-bounce">MAKÉT</p>
        </Link>
      </div>

      <div className="flex items-center w-full max-w-[600px] mx-4">
        <input
          type="text"
          placeholder="Cari event seru di sini"
          className="w-full h-[50px] px-4 py-2 rounded-l-md bg-white text-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-700 rounded-r-md text-white hover:bg-blue-600 h-[50px] w-[80px]">
        <FaSearch className="text-2xl flex ml-5"/>
        </button>
      </div>

      <div className="flex items-center space-x-4 text-white">
        <Link href="/">
          <p className="flex items-center space-x-2 hover:text-gray-300">
            <span className="material-icons"><BsCalendar2Event className=" text-xl"/></span>
            <span className=" text-md">Create Event</span>
          </p>
        </Link>

        <Link href="/">
        <p className="flex items-center space-x-2 hover:text-gray-300">
            <span className="material-icons"><GrCart  className=" text-xl"/></span>
            <span className=" text-md">My Order</span>
          </p>
        </Link>
      </div>

      <div className="flex items-center space-x-2 text-white">

        <Link href="/">
          <p className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-blue-900 text-md">
            Register
          </p>
        </Link>
        <Link href="/">
          <p className="px-7 py-2 border border-white bg-blue-700 rounded-md hover:bg-blue-600 text-md">
            Login
          </p>
        </Link>
        </div>
    </nav>
  );
};

export default Navbar;
