import React from "react";
import Image from "next/image";

const AppLogo = () => {
  return (
    <div className="h-full w-full flex flex-row justify-center items-center md:gap-x-3">
      <Image src="/python_logo.svg" alt="Logo pybox" height={75} width={75} />
      <span className="hidden md:block text-4xl font-bold text-primary">
        pybox
      </span>
    </div>
  );
};

export { AppLogo };
