"use client";

import { registerSchema } from "@/schemas/register-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { AlertCircle, CheckCircle, LoaderCircle } from "lucide-react";
import { register } from "@/server/register";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await register(values);
      setSuccess(
        "Konto zostało pomyślnie utworzone! Możesz się teraz zalogować.",
      );
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Sukces!</AlertTitle>
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Błąd</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-x-3 gap-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imie</FormLabel>
                <FormControl>
                  <Input placeholder="Jan" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kowalski"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Adres email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="jan.kowalski@gmail.com"
                    {...field}
                    type={"email"}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Hasło</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********"
                    {...field}
                    type={"password"}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Powtórz hasło</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********"
                    {...field}
                    type={"password"}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          variant={"default"}
          className="w-full bg-[#ffb319] hover:bg-[#ffb319]/90 text-primary"
          disabled={isLoading}
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Zarejestruj się
        </Button>
        <p className="text-sm text-muted-foreground">
          Masz już konto?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-[#ffb319]"
          >
            Zaloguj się
          </Link>{" "}
          !
        </p>
      </form>
    </Form>
  );
};

export { RegisterForm };
