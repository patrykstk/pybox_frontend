import React from 'react';
import {Logo} from "@/components/logo";
import {RegisterForm} from "@/app/(auth)/_components/register-form";

const RegisterPage = () => {

    return (
        <main className="w-full flex flex-row font-sans">
            <div className="w-full md:w:1/2 bg-[#ffb319] hidden sm:block">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <Logo />
                </div>
            </div>
            <div className="w-full md:w:1/2 flex items-center justify-center">
                <div className="w-full px-10 flex flex-col space-y-8">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold uppercase">
                            Rejestracja
                        </h1>
                        <h6 className="font-light text-white/80">
                            Załóż własne konto aby skorzystać z aplikacji!
                        </h6>
                    </div>

                    <RegisterForm />
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;