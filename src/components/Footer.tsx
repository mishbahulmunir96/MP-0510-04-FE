"use client";
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  // mengumpetkan navbar di ragisterpage dan loginpage
  const hiddenPages = ["/register", "/login", "/dashboard"];
  const shouldHideFooter =
    hiddenPages.includes(pathname) || pathname.startsWith("/dashboard/");

  if (shouldHideFooter) return null;
  return (
    <footer className="bg-blue-400">
      <div className="container mx-auto px-4 pb-8 pt-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">About Maket</h3>
            <ul className="space-y-3">
              {[
                "Login",
                "Pricing",
                "View Events",
                "FAQ",
                "Terms and Conditions",
                "Report Issues",
                "System",
                "Compliance",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-blue-50 transition-colors hover:text-white"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 -translate-y-1 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              Celebrate Your Event
            </h3>
            <ul className="space-y-3">
              {[
                "How to Prepare an Event",
                "How to Create a Competition Event",
                "How to Publish an Event",
                "How to Create a Music Event",
                "How to Manage an Event",
                "How to Create an Attractive Event Concept",
                "How to Host an Event in a Co-Working Space",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-blue-50 transition-colors hover:text-white"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 -translate-y-1 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Event Locations</h3>
            <ul className="space-y-3">
              {[
                "Jakarta",
                "Bandung",
                "Yogyakarta",
                "Surabaya",
                "Solo",
                "Medan",
                "Bali",
                "All Cities",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-blue-50 transition-colors hover:text-white"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 -translate-y-1 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Event Inspiration</h3>
            <ul className="space-y-3">
              {[
                "Festival",
                "Concert",
                "Sports",
                "Workshop & Seminar",
                "Theater & Drama",
                "Attractions",
                "All Categories",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-blue-50 transition-colors hover:text-white"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 -translate-y-1 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-12 border-t border-blue-400/30" />

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-blue-50 transition-colors hover:text-white"
            >
              Security and Privacy
            </a>
            <a
              href="#"
              className="text-blue-50 transition-colors hover:text-white"
            >
              Terms of Service
            </a>
          </div>

          <div className="flex items-center gap-6">
            {[
              { Icon: FaInstagram, label: "Instagram" },
              { Icon: FaTiktok, label: "TikTok" },
              { Icon: FaYoutube, label: "YouTube" },
              { Icon: FaFacebook, label: "Facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="transform text-blue-50 transition-colors duration-200 hover:scale-110 hover:text-white"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-blue-100">
          © {new Date().getFullYear()} Maket. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
