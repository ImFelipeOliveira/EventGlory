"use server";

import { setCookieToast } from "@/lib/toast/set-toast-cookie";
import { actionAPIFetch } from "../../../lib/fetch-server";
import { publicEncrypt } from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type registerData = {
  email: string;
  password: string;
  password_confimation: string;
};

type loginData = {
  username: string;
  password: string;
};

const endpoint = "register/";
export async function registerUser(data: registerData) {
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

export async function loginUser(data: loginData) {
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
