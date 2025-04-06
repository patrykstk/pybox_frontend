import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("sessionToken")?.value;
  const { pathname } = req.nextUrl;

  if (
    sessionToken &&
    (pathname === "/login" || pathname === "/register" || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (
    !sessionToken &&
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/manage",
    "/settings/:path*",
    "/tasks/:path*",
    "/login",
    "/register",
  ],
};
