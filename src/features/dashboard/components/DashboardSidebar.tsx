"use client";
import {
  CalendarRange,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Search,
  Settings,
  Ticket,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const items = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: CircleUserRound,
  },
  {
    title: "My Event",
    icon: CalendarRange,
    submenu: [
      { title: "Event List", url: "/dashboard/my-event/event-list" },
      { title: "My Voucher", url: "/dashboard/my-event/my-vouchers" },
      {
        title: "Transactions",
        url: "/dashboard/my-event/transactions",
      },
      { title: "Attendance", url: "/dashboard/my-event/attendance" },
      { title: "Statistics", url: "/dashboard/my-event/statistics" },
    ],
  },
  {
    title: "My Ticket",
    icon: Ticket,
    submenu: [
      { title: "Purchases History", url: "/dashboard/my-ticket/purchases" },
    ],
  },

  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  const user = useSelector((state: RootState) => state.user);

  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <Sidebar className="mt-16" collapsible="icon">
      <SidebarContent>
        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              if (item.title === "My Event" && user.role === "USER") {
                return null;
              }

              return (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible
                      defaultOpen
                      className="group/collapsible"
                      open={openItem === item.title}
                      onOpenChange={() =>
                        setOpenItem(openItem === item.title ? null : item.title)
                      }
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="flex items-center">
                            <item.icon
                              style={{ height: "20px", width: "20px" }}
                            />
                            <span className="text-base font-medium text-slate-500">
                              {item.title}
                            </span>
                            <ChevronRight
                              className={`ml-auto transition-transform duration-200 ${openItem === item.title ? "rotate-90" : ""}`}
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map((subitem) => (
                              <SidebarMenuSubItem key={subitem.title}>
                                <Link href={subitem.url}>
                                  <span className="text-sm font-medium text-slate-500">
                                    {subitem.title}
                                  </span>
                                </Link>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon style={{ height: "20px", width: "20px" }} />
                        <span className="text-base font-medium text-slate-500">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
