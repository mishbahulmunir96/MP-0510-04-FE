import DashboardLayout from "@/features/dashboard/DashboardLayout";
import PurchasesHistoryPage from "@/features/dashboard/my-ticket/purchases";
import React from "react";

const PurchasesHistory = () => {
  return (
    <DashboardLayout>
      <PurchasesHistoryPage />
    </DashboardLayout>
  );
};

export default PurchasesHistory;
