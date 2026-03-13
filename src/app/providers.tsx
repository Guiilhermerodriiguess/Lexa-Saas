"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/TRPCProvider";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <TRPCProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme="system"
          />
        </ThemeProvider>
      </TRPCProvider>
    </ClerkProvider>

  );
}
