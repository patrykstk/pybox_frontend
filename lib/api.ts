"use server";

import axios from "axios";
import { cookies } from "next/headers";

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
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error decrypting token:", error);
      }
    } else {
      console.warn(
        "No token found, API request without authorization! Probably logging in or on registration",
      );
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
