"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { assignRole } from "@/server/assign-role";
import { removeRole } from "@/server/remove-role";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  email: z.string().email({ message: "Podaj poprawny adres email." }),
  role: z.enum(["manager", "moderator"], {
    message: "Wybierz poprawną rolę.",
  }),
  action: z.enum(["assign", "remove"], {
    message: "Wybierz operację.",
  }),
});

// Define the type from the Zod schema
type FormValues = z.infer<typeof FormSchema>;

const ManageRoles = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      role: "manager",
      action: "assign",
    },
  });

  const selectedAction = form.watch("action");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      if (data.action === "assign") {
        const response = await assignRole(data.email, data.role);
        if (response && response.success) {
          toast.success(`Przyznano rolę ${data.role} dla ${data.email}`);
          form.reset();
        } else {
          toast.error(response?.error || "Wystąpił nieznany błąd");
        }
      } else {
        const response = await removeRole(data.email, data.role);
        if (response && response.success) {
          toast.success(`Usunięto rolę ${data.role} dla ${data.email}`);
          form.reset();
        } else {
          toast.error(response?.error || "Wystąpił nieznany błąd");
        }
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas wykonywania operacji");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Zarządzanie rolami</CardTitle>
          <CardDescription>
            {selectedAction === "assign"
              ? "Nadaj rolę użytkownikowi"
              : "Usuń rolę użytkownika"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operacja</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz operację" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assign">Nadaj rolę</SelectItem>
                          <SelectItem value="remove">Usuń rolę</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email użytkownika</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Adres email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedAction === "assign"
                        ? "Rola do nadania"
                        : "Rola do usunięcia"}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz rolę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Przetwarzanie...
                  </>
                ) : selectedAction === "assign" ? (
                  "Nadaj rolę"
                ) : (
                  "Usuń rolę"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export { ManageRoles };
