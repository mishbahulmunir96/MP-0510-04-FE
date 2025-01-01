"use client";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import TransactionsPage from "@/features/dashboard/my-event/transactions";
import RoleGuard from "@/hoc/RoleGuard";
import React from "react";

const Transactions = () => {
  return (
    <DashboardLayout>
      <TransactionsPage />
    </DashboardLayout>
  );
};

export default RoleGuard(Transactions);
