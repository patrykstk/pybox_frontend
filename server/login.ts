"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas/login-schema";
import api from "@/lib/api";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";

const login = async (values: z.infer<typeof loginSchema>) => {
  console.log("Received values:", values);

  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.format());
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  console.log("Validated fields:", { email, password });

  try {
    console.log("Sending login request...");
    const response = await api.post(
      "/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } },
    );

    console.log("Response received:", response.data);

    if (response.data?.token) {
      const token = response.data.token;
      const expires = new Date(Date.now() + 60 * 60 * 10000);

      console.log("Encrypting session...");
      const encryptedToken = await encrypt({ token, expires });

      console.log("Storing token in cookies...");
      const cookieStore = await cookies();
      cookieStore.set("sessionToken", encryptedToken, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      console.log("Login successful!");
      return { success: "Successfully logged in!" };
    } else {
      console.error("Login failed: No token received!");
      return { error: "Login failed: No token received!" };
    }
  } catch (error: any) {
    console.error("Login API Error:", error.response?.data || error.message);
    return { error: "Login failed! Please try again later." };
  }
};

export { login };
