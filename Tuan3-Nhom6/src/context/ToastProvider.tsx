import { useState } from "react";
import { ToastContext } from "./toastCore";
import type { ReactNode } from "react";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
