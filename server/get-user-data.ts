"use server";

import api from "@/lib/api";
import { cookies } from "next/headers";

const getUserData = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessionToken")?.value;

    if (!token) {
      console.error("No token available");
      return;
    }

    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log("API Response:", response);
    // Sprawdź status odpowiedzi i dane użytkownika
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.response || error.message);
    if (error.response) {
      console.error("Response data:", error.response.data); // Sprawdź szczegóły błędu
    }
  }
};

export { getUserData };
