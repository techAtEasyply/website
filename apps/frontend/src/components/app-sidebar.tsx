import {
  BriefcaseBusiness,
  Calendar,
  CheckCheck,
  LayoutDashboard,
  Newspaper,
  Settings,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserButton } from '@clerk/clerk-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Resume",
    url: "/resume",
    icon: Newspaper,
  },
  {
    title: "Job and Internship",
    url: "/job-and-internship",
    icon: BriefcaseBusiness,
  },
  {
    title: "Interview",
    url: "/interview",
    icon: Calendar,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <span>
              <SidebarGroupLabel>
                <CheckCheck
                  className="mr-2 animated-gradient-text"
                  style={{ fontSize: "1.6rem", fontWeight: 700 }}
                />
                <span
                  className="animated-gradient-text"
                  style={{ fontSize: "1.35rem", fontWeight: 700 }}
                >
                  Easyply
                </span>
              </SidebarGroupLabel>
            </span>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg">
                    <Link to={item.url}>
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
