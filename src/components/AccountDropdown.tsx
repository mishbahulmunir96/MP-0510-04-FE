import { CornerUpLeft, LayoutDashboard, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlices";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

const AccountDropdown = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const [selectedImage, setSelectedImage] = useState(user.profilePicture || "");

  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem("user-storage");
    dispatch(logoutAction());
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1">
          <DropdownMenuLabel>
            <h1 className="text-base font-semibold text-slate-900 first-letter:uppercase">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-xs font-light text-slate-100">{user.email}</p>
          </DropdownMenuLabel>
          <Avatar>
            <AvatarImage src={selectedImage} alt="@shadcn" />
            <AvatarFallback>
              <Image
                src="https://purwadhika.com/dashboard/static/icons/ic_profile.svg"
                alt="fallback"
                fill
                className="object-cover"
              />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-60 md:mr-16 md:mt-2">
        <DropdownMenuLabel>
          <h1 className="text-sm font-medium text-slate-600">
            You registered as
          </h1>
          <p className="text-blue-700">
            {user.role === "USER" ? "CUSTOMER" : user.role}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/dashboard/profile">
            <DropdownMenuItem>
              <User />
              <span>My Account</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/profile">
            <DropdownMenuItem>
              <LayoutDashboard />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/">
            <DropdownMenuItem>
              <CornerUpLeft />
              <span>Back To Home</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
