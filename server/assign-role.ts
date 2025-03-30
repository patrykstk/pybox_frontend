"use server";

import api from "@/lib/api";
import { Role } from "@/types/role";

const assignRole = async (userEmail: string, roleName: Role) => {
  try {
    const response = await api.post(`/user/${userEmail}/assign-role`, {
      roleName,
    });

    if (response.data.status === "success") return { success: "yay" };
  } catch (error) {
    return { error: "bład" };
  }
};

export { assignRole };
