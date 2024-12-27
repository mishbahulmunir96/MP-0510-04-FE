import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/authProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TokenProvider from "@/providers/TokenProvider";
import { poppins } from "./utils/font";

export const metadata: Metadata = {
  title:
    "MAKÉT | Makelar Ticket. Access Your Favorite Events with a Single Click!",
  description:
    "Welcome to MAKÉT – Your Ultimate Event Management Solution! Whether you’re planning a personal celebration or a corporate gathering, MAKÉT is here to streamline your event management process. For Organizers: Effortlessly create, manage, and promote your events with our user-friendly platform. Collaborate with your team, track registrations, and sell tickets all in one place. For Attendees: Discover exciting events and enjoy a seamless registration experience. Stay updated with event details and connect with fellow attendees effortlessly. Join us at MAKÉT and make every event a memorable experience!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <StoreProvider>
          <AuthProvider>
            <TokenProvider>
              <ReactQueryProvider>
                <Navbar />
                {children}
              </ReactQueryProvider>
              <Footer />
              <ToastContainer />
            </TokenProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
