"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { Ticket, User, Menu, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BsCalendar2Event } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";
import AccountDropdown from "./AccountDropdown";
import { useState, useEffect } from "react";
import { MobileLogo } from "./ui/mobileLogo";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-menu");
      if (nav && !nav.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const hiddenPages = ["/register", "/login", "/forgot-password"];
  const shouldHideNavbar =
    hiddenPages.includes(pathname) || pathname.startsWith("/reset-password");
  const shouldHideCreateEvent = pathname === "/create-event";

  const handleLogout = () => {
    setMobileMenuOpen(false);
    router.push("/login");
  };

  if (shouldHideNavbar) return null;

  const NavButton = ({ href, icon: Icon, children, onClick }: any) => (
    <Link href={href} onClick={onClick}>
      <Button
        variant="ghost"
        className="w-full text-left text-white hover:bg-white/10 hover:text-yellow-300 
                 transition-colors duration-300 flex items-center space-x-3"
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
        {children && <span className="flex-1">{children}</span>}
      </Button>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Desktop Logo */}
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
                <p className="text-xs font-bold tracking-widest text-yellow-300 group-hover:text-yellow-400 transition-all duration-300 mt-1">
                  YOUR TICKET TO EXCITEMENT
                </p>
              </div>
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="md:hidden">
            <MobileLogo />
          </div>

          <div className="flex items-center space-x-6">
            {user.id && !shouldHideCreateEvent && user.role === "ORGANIZER" && (
              <NavButton href="/create-event" icon={BsCalendar2Event}>
                Create Event
              </NavButton>
            )}
            {user.id && user.role === "USER" && (
              <NavButton href="/my-ticket" icon={GrCart}>
                My Tickets
              </NavButton>
            )}
            <NavButton href="/explore" icon={IoRocketSharp}>
              Explore
            </NavButton>
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
                    <span className="md:hidden">
                      <User className="h-4 w-4" />
                    </span>
                    <span className="hidden md:inline">Login</span>
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center">
                <div className="hidden md:block">
                  <AccountDropdown />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden fixed inset-x-0 top-16 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg animate-in slide-in-from-top duration-300"
          >
            <div className="px-4 py-3 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {user.id && (
                <>
                  {!shouldHideCreateEvent && user.role === "ORGANIZER" && (
                    <NavButton
                      href="/create-event"
                      icon={BsCalendar2Event}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create Event
                    </NavButton>
                  )}
                  {user.role === "USER" && (
                    <NavButton
                      href="/my-ticket"
                      icon={GrCart}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Tickets
                    </NavButton>
                  )}
                </>
              )}

              <NavButton
                href="/explore"
                icon={IoRocketSharp}
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </NavButton>

              {user.id && (
                <div className="pt-2 mt-2 border-t border-white/10 space-y-2">
                  <NavButton
                    href="/profile"
                    icon={User}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </NavButton>
                  <NavButton
                    href="/settings"
                    icon={Settings}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </NavButton>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full text-left text-white hover:bg-white/10 hover:text-red-300 transition-colors duration-300 flex items-center space-x-3"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1">Logout</span>
                  </Button>
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
