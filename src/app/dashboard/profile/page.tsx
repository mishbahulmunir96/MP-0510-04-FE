"use client";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import ProfilePage from "@/features/dashboard/profile";
import AuthGuard from "@/hoc/AuthGuard";

const Profile = () => {
  return (
    <DashboardLayout>
      <ProfilePage />
    </DashboardLayout>
  );
};

export default AuthGuard(Profile);
