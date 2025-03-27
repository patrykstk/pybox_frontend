import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  return NextResponse.next();
}
