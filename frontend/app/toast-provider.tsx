"use client";

import React, { use, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";
import { ToasterProps } from "sonner";
import { useCookieToast } from "@/lib/toast/toast";

export default async function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  const toast = useCookieToast();

  useEffect(() => {
    const callToast = async () => {
      await toast;
    };
    callToast();
  }, [toast]);

  return (
    <>
      {children}
      <Toaster
        closeButton
        duration={3000}
        theme={resolvedTheme as ToasterProps["theme"]}
        richColors={true}
      />
    </>
  );
}
