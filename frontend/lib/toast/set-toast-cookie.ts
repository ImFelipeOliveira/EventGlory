import { cookies } from "next/headers";

export async function setCookieResponse(
  message: string,
  error?: string,
  status?: "success" | "error"
) {
  const toastCookie = await cookies();
  if (error) {
    const errorMessage: string =
      error != "Ocorreu um erro inesperado" ? error : message;

    if (status === "error") {
      toastCookie.set("toast-error", errorMessage);
      return { error: errorMessage };
    }
  }
  toastCookie.set("toast-success", message);
  return { data: message };
}
