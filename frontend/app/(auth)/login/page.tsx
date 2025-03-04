"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import favicon from "../../favicon.ico";
import LoginForm from "@/components/auth/login-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginForm = z.object({
  username: z.string().email("Você deve informar um email."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export default function Login() {
  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href={"/home"}>
            <Image
              src={favicon}
              alt="Logo"
              style={{ borderRadius: "calc(infinity * 1px)" }}
            />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Com este modelo, organizar eventos cristãos se tornou mais
              simples e eficiente, permitindo que mais pessoas sejam alcançadas
              pelo amor de Deus."
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Form {...form}>
            <LoginForm />
          </Form>
          <p className="px-8 text-center text-sm text-muted-foreground ml-10">
            Ao clicar em Registrar, você concorda com nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politicas de Privacidade.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
