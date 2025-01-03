"use client";
import UpdateEventPage from "@/features/dashboard/update-event";
import RoleGuard from "@/hoc/RoleGuard";
import React from "react";

const UpdateEvent = ({ params }: { params: { id: string } }) => {
  return <UpdateEventPage eventId={Number(params.id)} />;
};

export default RoleGuard(UpdateEvent);
