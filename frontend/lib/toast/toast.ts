"use client";

import { deleteCookie, getCookie } from "cookies-next/client";
import { toast } from "sonner";

export async function useCookieToast() {
  const toastSuccess = await getCookie("toast-success");
  const toastError = await getCookie("toast-error");

  if (toastSuccess) {
    toast.success(toastSuccess);
    deleteCookie("toast-success");
  }

  if (toastError) {
    toast.error(toastError);
    deleteCookie("toast-error");
  }
}
