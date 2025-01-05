"use client";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import AttendancePage from "@/features/dashboard/my-event/attendance";
import RoleGuard from "@/hoc/RoleGuard";
import React from "react";

const attendance = () => {
  return (
    <DashboardLayout>
      <AttendancePage />
    </DashboardLayout>
  );
};

export default RoleGuard(attendance);
