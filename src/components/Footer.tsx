"use client";

import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";
import { ArrowUpRight } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();

  const hiddenPages = [
    "/register",
    "/login",
    "/dashboard",
    "/forgot-password",
    "/reset-password",
  ];
  const shouldHideFooter =
    hiddenPages.includes(pathname) ||
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/reset-password/");

  if (shouldHideFooter) return null;

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Maket</h3>
            <p className="text-sm">
              Maket is your go-to platform for innovative solutions. We're dedicated to providing top-notch services and products to our valued customers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">123 Main Street, City, Country</p>
            <p className="text-sm mb-2">Phone: +1 234 567 890</p>
            <p className="text-sm">Email: info@maket.com</p>
          </div>
        </div>

        <div className="border-t border-blue-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {[
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaTiktok, label: "TikTok" },
                { Icon: FaYoutube, label: "YouTube" },
                { Icon: FaFacebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="transform transition-all duration-200 hover:scale-110 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} Maket. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

