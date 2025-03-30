"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  BookMarked,
  BookPlus,
  ClipboardCheck,
  FileSpreadsheet,
  House,
} from "lucide-react";
import { AppLogo } from "@/components/app-logo";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const sidebarItems = [
  {
    id: 1,
    title: "Strona główna",
    url: "/home",
    icon: House,
  },
  {
    id: 2,
    title: "Moje zadania",
    url: "/tasks/my",
    icon: BookMarked,
  },
  {
    id: 3,
    title: "Stwórz zadanie",
    url: "/tasks/create",
    icon: BookPlus,
  },
  {
    id: 4,
    title: "Wyniki moich odpowiedzi",
    url: "/tasks/results",
    icon: FileSpreadsheet,
  },
  {
    id: 5,
    title: "Oceń odpowiedzi",
    url: "/tasks/review",
    icon: ClipboardCheck,
  },
];

const LayoutSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-[200px]">
            <AppLogo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-2 rounded-md transition-all",
                          isActive
                            ? "bg-yellow-500 text-black hover:bg-yellow-500 hover:text-black/70 font-medium"
                            : "hover:bg-yellow-500 text-black",
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { LayoutSidebar };
