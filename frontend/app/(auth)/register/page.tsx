"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import registerUser from "../_actions/actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 6 caracteres"),
  password_confirmation: z
    .string()
    .min(8, "Senha deve ter no mínimo 6 caracteres"),
});

export default function Register() {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await registerUser(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex justify-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Registrar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={formMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="gap-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite um email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Registrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
