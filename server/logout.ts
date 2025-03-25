"use server"

import api from "@/lib/api";
import {cookies} from "next/headers";

const logout = async () => {
    try {
        const response = await api.post("/logout");

        if (response.data.status === "success") {
            const cookieStore = await cookies();
            cookieStore.set("session", "", { maxAge: 0, path: "/" });
            return { success: true};
        } else return { error: false };

    } catch (error) {
        console.error(error);
        console.log("Logout failed!");

        return { error: "Logout failed!" };
    }
}

export { logout };

