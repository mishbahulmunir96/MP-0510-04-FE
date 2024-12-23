"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlices";
import Link from "next/link";
import { BsCalendar2Event } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("user-storage");
    dispatch(logoutAction());
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-400 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center space-x-2"
          >
            <div className="relative">
              <p className="text-2xl font-extrabold text-white tracking-tight">
                MAKÉT
              </p>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {!!user.id && (
              <Link href="/create-event">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-white hover:bg-white/10"
                >
                  <BsCalendar2Event className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </Link>
            )}

            <Link href="/my-ticket">
              <Button 
                variant="ghost" 
                className="text-white hover:text-white hover:bg-white/10"
              >
                <GrCart className="mr-2 h-4 w-4" />
                My Tickets
              </Button>
            </Link>

            <Link href="/explore-event">
              <Button 
                variant="ghost" 
                className="text-white hover:text-white hover:bg-white/10"
              >
                <IoRocketSharp className="mr-2 h-4 w-4" />
                Explore
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {!user.id ? (
              <>
                <Link href="/register">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-white hover:bg-white/10"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button 
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-white/90"
                  >
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/login" onClick={logout}>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-white hover:bg-white/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-white/10">
        <div className="flex justify-around p-2">
          {!!user.id && (
            <Link href="/create-event">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:text-white hover:bg-white/10"
              >
                <BsCalendar2Event className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <Link href="/my-ticket">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white hover:bg-white/10"
            >
              <GrCart className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/explore-event">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white hover:bg-white/10"
            >
              <IoRocketSharp className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;