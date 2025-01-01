"use client";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import ReferralPage from "@/features/dashboard/refferals";
import AuthGuard from "@/hoc/AuthGuard";
import React from "react";

const refferal = () => {
  return (
    <DashboardLayout>
      <ReferralPage />
    </DashboardLayout>
  );
};

export default AuthGuard(refferal);
