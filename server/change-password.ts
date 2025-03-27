"use server";

import * as z from "zod";
import api from "@/lib/api";
import { changePasswordSchema } from "@/schemas/change-password-schema";

const changePassword = async (values: z.infer<typeof changePasswordSchema>) => {
  const validatedFields = changePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { old_password, password, password_confirmation } =
    validatedFields.data;

  try {
    const response = await api.patch("/user/password", {
      old_password,
      password,
      password_confirmation,
    });

    if (response.data.status === "success") return { success: "yay" };
  } catch (error) {
    return { error: "bład" };
  }
};

export { changePassword };
