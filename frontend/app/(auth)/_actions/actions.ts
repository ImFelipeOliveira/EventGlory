"use server";

import { setCookieToast } from "@/lib/toast/set-toast-cookie";
import { actionAPIFetch } from "../../../lib/fetch-server";
import { redirect } from "next/navigation";

const endpoint = "register/";
export default async function registerUser(data: any) {
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
