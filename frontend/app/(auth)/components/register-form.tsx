"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { registerFormSchema } from "@/app/(auth)/register/page";
import z from "zod";
import { registerUser } from "@/app/(auth)/_actions/actions";

export default function RegisterForm() {
  const formMethods = useFormContext<z.infer<typeof registerFormSchema>>();
  const { handleSubmit } = formMethods;

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    await registerUser(data);
  };

  return (
    <Card className="w-[400px] flex justify-center">
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
            <Button type="submit" className="w-full cursor-pointer">
              Registrar
            </Button>

            <div className="flex items-center justify-center space-x-2">
              <hr className="flex-grow border-t border-muted-foreground border-0.2" />
              <span className="text-sm text-muted-foreground">
                Ou continue com
              </span>
              <hr className="flex-grow border-t border-muted-foreground border-0.2" />
            </div>

            <div className="flex justify-center space-x-5">
              <Link href={"#"}>
                <Button
                  variant={"outline"}
                  style={{ width: "150px", cursor: "pointer" }}
                >
                  <FaGoogle title="Google" />
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  variant={"outline"}
                  style={{ width: "150px", cursor: "pointer" }}
                >
                  <FaFacebook title="Facebook" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-sm text-primary cursor-pointer"
                  style={{ width: "150px" }}
                >
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
