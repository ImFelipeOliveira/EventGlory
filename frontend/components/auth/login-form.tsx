"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function LoginForm() {
  const formMethods = useFormContext();
  const { handleSubmit } = formMethods;
  return (
    <Card className="w-[400px] flex justify-center">
      <CardHeader>
        <CardTitle className="flex justify-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(() => undefined)} className="space-y-5">
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
            <Button type="submit" className="w-full">
              Login
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
                <Button variant={"outline"} style={{ width: "150px" }}>
                  <FaGoogle title="Google" />
                </Button>
              </Link>
              <Link href={"#"}>
                <Button variant={"outline"} style={{ width: "150px" }}>
                  <FaFacebook title="Facebook" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              <Link href="/register">
                <Button variant="link" className="text-sm text-primary">
                  Registrar
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
