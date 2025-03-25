import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutSidebar } from "@/app/(protected)/_components/layout-sidebar";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

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
        <div className="w-full flex flex-row gap-x-2 items-center bg-accent py-3 px-3">
          <SidebarTrigger className="cursor-pointer" />
          <div className="w-[1.5px] h-full bg-black"></div>
        </div>
        <div className="p-3">
          <div className="bg-accent h-full w-full rounded-lg px-4 py-2">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
