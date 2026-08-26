"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  FileCode,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: Users,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FileCode,
  },
];

export function DashboardSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO:
    // Remove authentication token here.

    router.push("/login");
  };

  return (
    <Sidebar>
      {/* =====================================================
          HEADER
          ===================================================== */}

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-12"
              onClick={() => router.push("/dashboard")}
            >
              <span className="font-headline text-xl font-bold tracking-tight">
                Lunex
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => router.push(item.href)}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* =====================================================
          USER MENU
          ===================================================== */}

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-none px-2 text-left text-sm outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col text-left">
              <span className="truncate text-sm font-medium">John Doe</span>

              <span className="truncate text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="start" className="w-56">
            {/* User information */}
            <div className="px-2 py-2">
              <p className="text-sm font-medium">John Doe</p>

              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>

            <DropdownMenuSeparator />

            {/* Settings */}
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
