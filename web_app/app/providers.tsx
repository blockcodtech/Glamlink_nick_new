"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { AuthProvider } from "@/lib/auth/components/AuthProvider";
import PageVisibilitySync from "@/lib/components/PageVisibilitySync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <PageVisibilitySync />
        {children}
      </AuthProvider>
    </Provider>
  );
} 