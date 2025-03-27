"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { logout } from "@/server/logout";
import { useRouter } from "next/navigation";

const SettingsButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logout();
  };

  const handleSettings = async () => {
    router.push("/settings");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer">
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleSettings}>
          Ustawienia profilu
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row items-center text-red-400 hover:bg-red-500/40"
          onClick={handleLogout}
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SettingsButton };
