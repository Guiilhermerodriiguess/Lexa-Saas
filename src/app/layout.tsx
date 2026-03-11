import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/widgets/Sidebar/ui/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "LEXA SAAS | Sistema Operacional Jurídico",
  description: "O sistema definitivo para excelência jurídica no Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="ml-64 flex-1 p-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
