"use client";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import PurchasesHistoryPage from "@/features/dashboard/my-ticket/purchases";
import AuthGuard from "@/hoc/AuthGuard";
import React from "react";

const PurchasesHistory = () => {
  return (
    <DashboardLayout>
      <PurchasesHistoryPage />
    </DashboardLayout>
  );
};

export default AuthGuard(PurchasesHistory);
