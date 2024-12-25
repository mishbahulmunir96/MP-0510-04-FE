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
import { useState } from "react";

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
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.submenu ? (
                  <Collapsible
                    defaultOpen
                    className="group/collapsible"
                    open={openItem === item.title} // Menentukan apakah collapsible terbuka
                    onOpenChange={() =>
                      setOpenItem(openItem === item.title ? null : item.title)
                    }
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex items-center">
                          <item.icon
                            style={{
                              height: "20px",
                              width: "20px",
                            }}
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
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
