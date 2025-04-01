import React from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await getSession();
  if (session) redirect("/home");
  return <div className="h-screen flex flex-row w-full mx-0">{children}</div>;
};

export default AuthLayout;
