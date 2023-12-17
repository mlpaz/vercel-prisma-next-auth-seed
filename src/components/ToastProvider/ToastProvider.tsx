"use client";
import React from "react";

import useKeydown from "@/hook/use-keydown";
import { IToast } from "@/components/Toast";

export const ToastContext = React.createContext({});

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<IToast[]>([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleEscape);

  function createToast(children: React.ReactNode, variant: string) {
    const nextToasts: IToast[] = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        children,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id: string) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
