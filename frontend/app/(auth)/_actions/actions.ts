"use server";

import { setCookieToast } from "@/lib/toast/set-toast-cookie";
import { actionAPIFetch } from "../../../lib/fetch-server";
import { publicEncrypt } from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const endpoint = "register/";
export async function registerUser(data: any) {
  const response = await actionAPIFetch(`${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response?.error) {
    await setCookieToast(response.error, response.error);
  } else {
    await setCookieToast(response?.data);
    redirect("/login");
  }
}

export async function loginUser(data: any) {
  const response = await actionAPIFetch("token/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response?.error) {
    await setCookieToast("Não foi possível realizar o login.", response.error);
  } else {
    await (await cookies()).set("refresh_token", response?.data.refresh);
    await (await cookies()).set("token_access", response?.data.access);
    await setCookieToast("Login realizado com sucesso.");
    redirect("/home");
  }
}
