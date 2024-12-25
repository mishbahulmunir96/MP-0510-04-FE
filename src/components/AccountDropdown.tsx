import {
  CornerUpLeft,
  LayoutDashboard,
  Loader2,
  LogOut,
  User,
} from "lucide-react";

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
import { logoutAction, updateUserAction } from "@/redux/slices/userSlices";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";

const AccountDropdown = () => {
  const user = useSelector((state: RootState) => state.user);
  const [currentRole, setCurrentRole] = useState(user.role);
  const updateUserMutation = useUpdateUser();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(user.profilePicture || "");

  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem("user-storage");
    dispatch(logoutAction());
  };

  const handleRoleSwitch = async (newRole: "USER" | "ORGANIZER") => {
    const payload = { role: newRole };
    setIsLoading(true);
    try {
      const updatedUser = await updateUserMutation.mutateAsync({
        id: user.id,
        payload,
      });
      setCurrentRole(newRole);
      dispatch(updateUserAction(updatedUser));
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={selectedImage} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-60 md:mr-16 md:mt-2">
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
          <DropdownMenuLabel className="text-center">
            Switch Account
          </DropdownMenuLabel>
          <div className="flex justify-between">
            <Button
              variant={user.role === "USER" ? "default" : "outline"}
              onClick={() => handleRoleSwitch("USER")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading
                </>
              ) : (
                "CUSTOMER"
              )}
            </Button>
            <Button
              variant={user.role === "ORGANIZER" ? "default" : "outline"}
              onClick={() => handleRoleSwitch("ORGANIZER")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading
                </>
              ) : (
                "ORGANIZER"
              )}
            </Button>
          </div>
        </DropdownMenuGroup>
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
