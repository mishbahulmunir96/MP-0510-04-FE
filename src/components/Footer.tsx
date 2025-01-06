"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();

  const hiddenPages = ["/register", "/login", "/forgot-password"];
  const shouldHideFooter =
    hiddenPages.includes(pathname) ||
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/reset-password/");

  if (shouldHideFooter) return null;

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-8 text-white md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-semibold">About Maket</h3>
            <p className="text-sm">
              Maket is your go-to platform for innovative solutions. We're
              dedicated to providing top-notch services and products to our
              valued customers.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Contact Us</h3>
            <p className="mb-2 text-sm">123 Main Street, City, Country</p>
            <p className="mb-2 text-sm">Phone: +1 234 567 890</p>
            <p className="text-sm">Email: info@maket.com</p>
          </div>
        </div>

        <div className="border-t border-blue-300 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/privacy"
                className="text-sm transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm transition-colors hover:text-white"
              >
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
