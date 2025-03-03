"use server";

import { setCookieResponse } from "@/lib/toast/set-toast-cookie";
import { actionAPIFetch } from "../../../lib/fetch-server";

const endpoint = "register/";
export default async function registerUser(data: any) {
  const response = await actionAPIFetch(`${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response?.error) {
    await setCookieResponse(response.error, response.error);
  } else {
    await setCookieResponse("User registered successfully");
  }
}
