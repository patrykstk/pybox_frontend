"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  if (!session) {
    throw new Error("No session token provided");
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    console.log("Secret decrypted", payload);
    return payload;
  } catch (error) {
    console.error("Failed to verify session:", error);
    throw new Error("Invalid session token");
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sessionToken")?.value;
  if (!session) {
    return null;
  }

  try {
    return await decrypt(session);
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}
