import React from 'react';
import {Logo} from "@/components/logo";
import {LoginForm} from "@/app/(auth)/_components/login-form";

const LoginPage = async () => {
    return (
        <main className="w-full flex flex-row font-sans">
            <div className="w-full md:w:1/2 flex items-center justify-center">
                <div className="w-full px-10 flex flex-col space-y-8">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold uppercase">
                            Logowanie
                        </h1>
                        <h6 className="font-light text-white/80">
                            Zaloguj się, aby uzyskać dostęp do aplikacji.
                        </h6>
                    </div>

                    <LoginForm />
                </div>
            </div>
            <div className="w-full md:w:1/2 bg-[#ffb319] hidden sm:block">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <Logo />
                </div>
            </div>
        </main>
    );
};

export default LoginPage;