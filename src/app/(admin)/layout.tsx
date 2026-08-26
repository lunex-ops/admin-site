import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="min-h-screen flex-1">
        <header className="flex h-14 items-center border-b border-border px-4">
          <SidebarTrigger />
        </header>

        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
