"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/server/logout";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      router.push("/login");
    } else {
      console.error("Logout failed:", result.error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
