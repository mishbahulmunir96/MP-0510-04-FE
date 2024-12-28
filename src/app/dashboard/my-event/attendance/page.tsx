import DashboardLayout from "@/features/dashboard/DashboardLayout";
import AttendancePage from "@/features/dashboard/my-event/attendance";
import React from "react";

const attendance = () => {
  return (
    <DashboardLayout>
      <AttendancePage />
    </DashboardLayout>
  );
};

export default attendance;
