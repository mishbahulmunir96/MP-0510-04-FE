import DashboardLayout from "@/features/dashboard/DashboardLayout";
import MyVouchersPage from "@/features/dashboard/my-event/my-voucher";
import React from "react";

const MyVouchers = () => {
  return (
    <DashboardLayout>
      <MyVouchersPage />
    </DashboardLayout>
  );
};

export default MyVouchers;
