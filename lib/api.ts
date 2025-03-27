"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("sessionToken")?.value;
};

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (config.url === "/login") return config;

    const token = await getToken();
    if (token) {
      try {
        const decryptedToken = await decrypt(token);
        //console.log("Decrypted Token:", decryptedToken);
        config.headers.Authorization = `Bearer ${decryptedToken.token}`;
      } catch (error) {
        //console.error("Error decrypting token:", error);
        // Optionally, you could logout the user here if token is invalid.
      }
    } else {
      console.warn("No token found, API request without authorization!");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
