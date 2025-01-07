"use client";
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
import { useAppSelector } from "@/redux/hooks";
import {
  CalendarRange,
  ChevronRight,
  CircleUserRound,
  Ticket,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    title: "Referrals",
    url: "/dashboard/refferals",
    icon: UsersRound,
  },
];

const DashboardSidebar = () => {
  const user = useAppSelector((state) => state.user);

  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    if (user.role === "ORGANIZER") {
      setOpenItem("My Event");
    } else if (user.role === "USER") {
      setOpenItem("My Ticket");
    }
  }, [user.role]);
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

              if (
                (item.title === "My Ticket" || item.title === "Referrals") &&
                user.role === "ORGANIZER"
              ) {
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
                                  <span className="ml-4 text-sm font-medium text-slate-500">
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
