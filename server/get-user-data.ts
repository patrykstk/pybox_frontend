"use server";

import api from "@/lib/api";
import { cookies } from "next/headers";
import { User } from "@/interfaces/user";

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
    console.error("Error fetching user data:", error.response || error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
  }
};

export { getUserData };
