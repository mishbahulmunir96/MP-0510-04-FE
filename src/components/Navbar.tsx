"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlices";
import Link from "next/link";
import { BsCalendar2Event } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import AccountDropdown from "./AccountDropdown";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const pathname = usePathname();

  // mengumpetkan navbar saat berada di register dan login
  const shouldHideNavbar =
    pathname === "/register" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  // mengumpetkan navbar saat di create event page
  const shouldHideCreateEvent = pathname === "/create-event";

  if (shouldHideNavbar) return null;

  return (
    <nav className="sticky top-0 z-50 bg-blue-400 shadow-lg">
      <div className="px-4 md:mx-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="relative">
              <p className="text-2xl font-extrabold tracking-tight text-white">
                MAKÉT
              </p>
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </div>
          </Link>

          <div className="hidden items-center space-x-6 md:flex">
            {!!user.id &&
              !shouldHideCreateEvent &&
              user.role === "ORGANIZER" && (
                <Link href="/create-event">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <BsCalendar2Event className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </Link>
              )}

            <Link href="/my-ticket">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <GrCart className="mr-2 h-4 w-4" />
                My Tickets
              </Button>
            </Link>

            <Link href="/explore">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
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
                    className="text-white hover:bg-white/10 hover:text-white"
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
              <AccountDropdown />
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 md:hidden">
        <div className="flex justify-around p-2">
          {!!user.id && !shouldHideCreateEvent && (
            <Link href="/create-event">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <BsCalendar2Event className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <Link href="/my-ticket">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <GrCart className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/explore-event">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white"
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
