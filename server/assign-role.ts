"use server";

import api from "@/lib/api";
import { Role } from "@/types/role";

const assignRole = async (userEmail: string, roleName: Role) => {
  try {
    const role_name = roleName as string;
    const response = await api.post(`/user/${userEmail}/assign-role`, {
      role: role_name,
    });

    if (response.data.status === "success") {
      return { success: true };
    } else {
      return { success: false, error: "Nie udało się przypisać roli" };
    }
  } catch (error) {
    return { success: false, error: "Wystąpił błąd serwera" };
  }
};

export { assignRole };
