import { cookies } from "next/headers";

export async function setCookieToast(message: string, error?: string) {
  const toastCookie = await cookies();
  if (error) {
    const errorMessage: string =
      error != "Ocorreu um erro inesperado" ? error : message;

    if (error) {
      await toastCookie.set("toast-error", errorMessage);
    }
  } else {
    await toastCookie.set("toast-success", message);
  }
}
