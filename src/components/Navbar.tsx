"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { Ticket, User, Menu } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsCalendar2Event } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";
import AccountDropdown from "./AccountDropdown";
import { useState } from 'react';
import { MobileLogo } from "./ui/mobileLogo";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hiddenPages = ["/register", "/login", "/forgot-password"];

  const shouldHideNavbar =
    hiddenPages.includes(pathname) || pathname.startsWith("/reset-password");

  const shouldHideCreateEvent = pathname === "/create-event";

  if (shouldHideNavbar) return null;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
      <div className="px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Desktop logo */}
          <div className="hidden md:block">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <Ticket className="h-10 w-10 text-white transform rotate-12 transition-all duration-300 group-hover:rotate-0 group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
              </div>
              <div className="relative">
                <div className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-300 group-hover:to-yellow-400 transition-all duration-300">
                  MAKÉT
                </div>
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-white/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
                <p className="text-xs font-bold tracking-widest text-yellow-300 group-hover:text-yellow-400 transition-all duration-300 mt-1">
                  YOUR TICKET TO EXCITEMENT
                </p>
                <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-yellow-300 transition-all duration-300 group-hover:w-full" />
              </div>
            </Link>
          </div>

          {/* Mobile logo */}
          <div className="md:hidden">
            <MobileLogo />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!!user.id &&
              !shouldHideCreateEvent &&
              user.role === "ORGANIZER" && (
                <Link href="/create-event">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                  >
                    <BsCalendar2Event className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </Link>
              )}

            {!!user.id && user.role === "USER" && (
              <Link href="/my-ticket">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                >
                  <GrCart className="mr-2 h-4 w-4" />
                  My Tickets
                </Button>
              </Link>
            )}

            <Link href="/explore">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
              >
                <IoRocketSharp className="mr-2 h-4 w-4" />
                Explore
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {!user.id ? (
              <>
                <Link href="/register" className="hidden md:inline-block">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-700 transition-colors duration-300"
                  >
                    {/* Show icon on mobile, text on desktop */}
                    <span className="md:hidden"><User className="h-4 w-4" /></span>
                    <span className="hidden md:inline">Login</span>
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center">
                {/* Show account info only on desktop */}
                <div className="hidden md:block">
                  <AccountDropdown />
                </div>
                {/* Show only icon on mobile */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white hover:bg-white/10"
                  >
                    <User className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button - only show if not logged in */}
          {!user.id && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!!user.id && !shouldHideCreateEvent && user.role === "ORGANIZER" && (
                <Link href="/create-event">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                  >
                    <BsCalendar2Event className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </Link>
              )}

              {!!user.id && user.role === "USER" && (
                <Link href="/my-ticket">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                  >
                    <GrCart className="mr-2 h-4 w-4" />
                    My Tickets
                  </Button>
                </Link>
              )}

              <Link href="/explore">
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                >
                  <IoRocketSharp className="mr-2 h-4 w-4" />
                  Explore
                </Button>
              </Link>

              {/* Add mobile menu items for logged-in users */}
              {!!user.id && (
                <div className="border-t border-white/10 pt-2 mt-2">
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;