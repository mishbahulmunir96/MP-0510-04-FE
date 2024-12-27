"use client";
import DashboardPage from "@/features/dashboard";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import AuthGuard from "@/hoc/AuthGuard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
};

export default AuthGuard(Dashboard);
