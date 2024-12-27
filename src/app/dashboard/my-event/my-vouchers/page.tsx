"use client";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import MyVouchersPage from "@/features/dashboard/my-event/my-voucher";
import RoleGuard from "@/hoc/RoleGuard";
import React from "react";

const MyVouchers = () => {
  return (
    <DashboardLayout>
      <MyVouchersPage />
    </DashboardLayout>
  );
};

export default RoleGuard(MyVouchers);
