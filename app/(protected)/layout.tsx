import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutSidebar } from "@/app/(protected)/_components/layout-sidebar";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LayoutNavigation } from "@/app/(protected)/_components/layout-navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <LayoutSidebar />
      <main className="flex flex-col w-full">
        <LayoutNavigation />
        <div className="p-3">
          <div className="h-full w-full rounded-lg px-4 py-2">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
