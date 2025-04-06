import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Logo } from "@/components/logo";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-10 bg-yellow-500">
      <div className="flex flex-col space-y-5 items-center">
        <h6 className="text-6xl font-bold uppercase font-sans">
          Zacznij korzystać z aplikacji
        </h6>
        <div className="flex flex-row gap-x-4">
          <Image
            src={"./python_logo.svg"}
            alt={"Logo aplikacji"}
            width={100}
            height={400}
          />
          <Logo />
        </div>
      </div>

      <div className="flex flex-row gap-x-5">
        <Link href="/register">
          <Button size="lg" className="text-lg px-8">
            REJESTRACJA
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg" className="text-lg px-8">
            LOGOWANIE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
