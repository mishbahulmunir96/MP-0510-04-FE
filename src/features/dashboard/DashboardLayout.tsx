import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; // Pastikan jalur ini benar
import DashboardSidebar from "./components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 p-4">
        <SidebarTrigger />

        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
