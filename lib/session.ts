"use server";

import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get("sessionToken")?.value;

  if (!session) {
    return null;
  } else return session;
}
