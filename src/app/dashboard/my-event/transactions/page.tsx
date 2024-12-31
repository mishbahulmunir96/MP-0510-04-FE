import DashboardLayout from "@/features/dashboard/DashboardLayout";
import TransactionsPage from "@/features/dashboard/my-event/transactions";
import React from "react";

const Transactions = () => {
  return (
    <DashboardLayout>
      <TransactionsPage />
    </DashboardLayout>
  );
};

export default Transactions;
