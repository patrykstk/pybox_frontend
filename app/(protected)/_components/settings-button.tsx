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
import { getUserData } from "@/server/get-user-data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SettingsButton = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    data: user,
    status,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
  });

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    router.push("/settings/password");
  };

  const handleRoleChange = async () => {
    router.push("/settings/roles");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer">
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === "success" && user && user.roles.includes("manager") ? (
          <DropdownMenuItem
            onClick={handleRoleChange}
            className="hover:cursor-pointer hover:bg-gray-100 hover:font-bold transition-all duration-200"
            disabled={loading}
          >
            Zmień role
          </DropdownMenuItem>
        ) : (
          <></>
        )}
        <DropdownMenuItem
          onClick={handlePasswordChange}
          className="hover:cursor-pointer hover:bg-gray-100 hover:font-bold transition-all duration-200"
          disabled={loading}
        >
          Zmień hasło
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex flex-row items-center text-red-400 ${
            loading
              ? "cursor-not-allowed opacity-50"
              : "hover:font-bold hover:cursor-pointer"
          }`}
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <span>Logging out...</span>
          ) : (
            <div className="flex flex-row gap-x-2 text-red-500 items-center">
              <LogOut className="text-red-500" /> Logout
            </div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SettingsButton };
