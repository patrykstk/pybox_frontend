"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas/login-schema";
import api from "@/lib/api";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";

const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await api.post("/login", { email, password });

    if (response.data.token) {
      const token = response.data.token;

      const expires = new Date(Date.now() + 60 * 60 * 10000);

      const session = await encrypt({ token, expires });

      const cookieStore = await cookies();
      cookieStore.set("sessionToken", session, { expires, httpOnly: true });
      console.log("Successfully logged in");
      return { success: "Successfully logged in!" };
    } else {
      return { error: "Login failed: Invalid credentials!" };
    }
  } catch (error) {
    console.error(error);
    console.log("Login failed!");

    return { error: "Login failed!" };
  }
};

export { login };
