"use server";

import api from "@/lib/api";
import { cookies } from "next/headers";
import { User } from "@/interfaces/models/user";

const getUserData = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessionToken")?.value;

    if (!token) {
      console.error("No token available");
      return;
    }

    const response = await api.get<User>("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getUserData };
