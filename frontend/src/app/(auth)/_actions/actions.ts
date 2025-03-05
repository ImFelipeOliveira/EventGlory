"use server";

import { setCookieToast } from "@/src/lib/toast/set-toast-cookie";
import { actionAPIFetch } from "../../../lib/fetch-server";
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

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("refresh_token");
  cookieStore.delete("token_access");

  if (typeof window !== "undefined") {
    const event = new Event("userLoggedOut");
    window.dispatchEvent(event);
  }

  redirect("/login");
}
