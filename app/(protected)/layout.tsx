import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LayoutSidebar from "@/app/(protected)/_components/layout-sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <SidebarProvider>
      <LayoutSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
