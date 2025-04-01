import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Profile } from "@/app/(protected)/_components/profile";
import { SettingsButton } from "@/app/(protected)/_components/settings-button";

const LayoutNavigation = () => {
  return (
    <div className="w-full flex flex-row gap-x-2 items-center bg-accent py-5     px-3 justify-between">
      <div>
        <SidebarTrigger className="cursor-pointer" />
      </div>
      <div className="flex flex-row gap-x-5">
        <Profile />
        <SettingsButton />
      </div>
    </div>
  );
};

export { LayoutNavigation };
