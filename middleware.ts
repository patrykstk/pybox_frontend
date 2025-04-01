import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("sessionToken")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await decrypt(sessionToken);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token detected, redirecting to login.");

    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("sessionToken", "", { maxAge: 0 });

    return response;
  }
}

export const config = {
  matcher: ["/home", "/manage", "/settings/:path*", "/tasks/:path*"],
};
