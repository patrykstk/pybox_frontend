"use server";

import api from "@/lib/api";
import { Role } from "@/types/role";

const removeRole = async (userEmail: string, roleName: Role) => {
  try {
    const response = await api.delete(`/user/${userEmail}/role/${roleName}`);

    if (response.data.status === "success") return { success: "yay" };
  } catch (error) {
    return { error: "bład" };
  }
};

export { removeRole };
