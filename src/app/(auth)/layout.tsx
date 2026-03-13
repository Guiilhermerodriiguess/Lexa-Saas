import { Gavel } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="flex w-full max-w-[460px] flex-col items-center gap-8 px-4">
        {/* Branding */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Gavel className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter">
              LEXA<span className="text-muted-foreground">SAAS</span>
            </h1>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Sistema Operacional Jurídico
          </p>
        </div>

        {/* Clerk Component */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
