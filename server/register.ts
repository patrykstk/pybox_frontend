"use server"

import * as z from "zod";
import { registerSchema } from "@/schemas/register-schema";
import api from "@/lib/api";


const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { firstName, lastName, email,  password, confirmPassword } = validatedFields.data;

    try {
        const response = await api.post("/register", {
            name: firstName,
            surname: lastName,
            email,
            password,
            password_confirmation: confirmPassword
        });

        if (response.data.status === "success") return { success: "Successfully registered!" };
        else return { error: "Registration failed!" };

    } catch {
        return { error: "Registration failed!" };
    }
}

export { register };