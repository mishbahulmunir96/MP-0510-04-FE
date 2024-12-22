import {
  Calendar,
  CalendarRange,
  CircleUserRound,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

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
    title: "Calendar",
    url: "#",
    icon: Calendar,
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
  return (
    <Sidebar className="mt-[68px]">
      <SidebarContent>
        <SidebarHeader>
          <Link href="/dashboard">Dashboard</Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value={item.title}>
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <item.icon />
                            <span className="ml-2">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.submenu.map((subitem) => (
                            <SidebarMenuItem key={subitem.title}>
                              <SidebarMenuButton asChild>
                                <Link href={subitem.url}>
                                  <span>{subitem.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
