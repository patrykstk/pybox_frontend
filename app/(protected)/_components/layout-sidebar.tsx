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

import { House, BookMarked, BookPlus } from "lucide-react";
import { AppLogo } from "@/components/app-logo";

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
];

const LayoutSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-[200px]">
            <AppLogo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LayoutSidebar;
