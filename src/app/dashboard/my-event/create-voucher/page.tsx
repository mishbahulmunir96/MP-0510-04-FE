"use client";

import DashboardLayout from "@/features/dashboard/DashboardLayout";
import CreateVoucherPage from "@/features/dashboard/my-event/create-voucher";
import RoleGuard from "@/hoc/RoleGuard";
import React from "react";

const CreateVouchers = () => {
  return (
    <DashboardLayout>
      <CreateVoucherPage />
    </DashboardLayout>
  );
};

export default RoleGuard(CreateVouchers);
