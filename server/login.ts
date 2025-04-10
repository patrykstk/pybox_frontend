"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas/login-schema";
import api from "@/lib/api";
import { cookies } from "next/headers";

const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  console.log("Validated fields:", { email, password });

  try {
    const response = await api.post(
      "/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } },
    );

    if (response.data?.token) {
      const token = response.data.token;
      const expires = new Date(Date.now() + 60 * 60 * 10000);

      const cookieStore = await cookies();
      cookieStore.set("sessionToken", token, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return { success: "Successfully logged in!" };
    } else {
      return { error: "Login failed: No token received!" };
    }
  } catch (error: any) {
    console.error("Login API Error:", error.response?.data || error.message);
    return { error: "Login failed! Please try again later." };
  }
};

export { login };
