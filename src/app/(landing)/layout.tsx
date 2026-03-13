import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // Se o usuário já está logado, redireciona para o dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
