"use client";
import CreateEventPage from "@/features/create-event";
import RoleGuard from "@/hoc/RoleGuard";

const CreateEvent = () => {
  return <CreateEventPage />;
};
export default RoleGuard(CreateEvent);
