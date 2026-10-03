import { useState, useCallback } from "react";
import { ToastNotificationState } from "@/types/admin";

export function useToast() {
  const [toast, setToast] = useState<ToastNotificationState | null>(null);

  const showToast = useCallback((text: string, type: "success" | "error" = "success", durationMs = 3500) => {
    setToast({ text, type });
    const timer = setTimeout(() => {
      setToast(null);
    }, durationMs);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
}
