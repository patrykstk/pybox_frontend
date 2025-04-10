"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { loginSchema } from "@/schemas/login-schema";
import { login } from "@/server/login";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await login(values);

      if (response.success) {
        setSuccess("Zalogowano pomyślnie! Przekierowuję...");
        setTimeout(() => {
          router.push("/home");
        }, 1500);
      } else {
        setError("Nieprawidłowy email lub hasło.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił błąd podczas logowania. Spróbuj ponownie później.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres email</FormLabel>
              <FormControl>
                <Input
                  placeholder="jankowalski@gmail.com"
                  {...field}
                  type="email"
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
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
                  {...field}
                  type="password"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="default"
          className="w-full bg-[#ffb319] hover:bg-[#ffb319]/90 text-primary"
          disabled={isLoading}
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Zaloguj się
        </Button>

        <p className="text-sm text-muted-foreground">
          Nie masz konta?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-[#ffb319]"
          >
            Stwórz je
          </Link>{" "}
          !
        </p>
      </form>
    </Form>
  );
};

export { LoginForm };
