import { CornerUpLeft, LayoutDashboard, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

const AccountDropdown = () => {
  const user = useSelector((state: RootState) => state.user);

  const [selectedImage, setSelectedImage] = useState(user.profilePicture || "");

  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem("user-storage");
    dispatch(logoutAction());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={selectedImage} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-56 md:mr-16 md:mt-2">
        <Link href="/dashboard/profile">
          <DropdownMenuLabel>
            <h1 className="text-base font-semibold uppercase text-slate-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-xs font-light text-slate-600">{user.email}</p>
          </DropdownMenuLabel>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/profile">
            <DropdownMenuItem>
              <User />
              <span>My Account</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard">
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
        <Link href="/login" onClick={logout}>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
