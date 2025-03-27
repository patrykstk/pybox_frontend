"use server";

import api from "@/lib/api";
import { cookies } from "next/headers";

const logout = async () => {
  try {
    const response = await api.post("/logout");

    if (response.data.status === "success") {
      (await cookies()).delete("sessionToken");
      return { success: true };
    } else {
      return { error: "Logout failed!" };
    }
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Logout failed! Please try again." };
  }
};

export { logout };
