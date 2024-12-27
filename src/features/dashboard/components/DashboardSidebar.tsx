"use client";
import {
  Calendar,
  CalendarRange,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FC, useState } from "react";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
    ],
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: CreditCard,
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
        <SidebarGroupLabel>
          <Link
            href="/dashboard"
            className="text-base font-medium text-slate-500"
          >
            Dashboard
          </Link>
        </SidebarGroupLabel>

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
