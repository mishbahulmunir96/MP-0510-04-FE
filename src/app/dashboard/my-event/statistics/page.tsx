"use client";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import StatisticPage from "@/features/dashboard/my-event/statistics";
import RoleGuard from "@/hoc/RoleGuard";
import React from "react";

const Statistics = () => {
  return (
    <DashboardLayout>
      <StatisticPage />
    </DashboardLayout>
  );
};

export default RoleGuard(Statistics);
