"use client";

import DashboardLayout from "@/features/dashboard/DashboardLayout";
import EventListPage from "@/features/dashboard/my-event/event-list";
import RoleGuard from "@/hoc/RoleGuard";

const EventList = () => {
  return (
    <DashboardLayout>
      <EventListPage />
    </DashboardLayout>
  );
};

export default RoleGuard(EventList);
