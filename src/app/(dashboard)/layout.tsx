import { Sidebar } from "@/widgets/Sidebar/ui/Sidebar";
import { Header } from "@/widgets/Header/ui/Header";
import { syncUserToSupabase } from "@/shared/api/supabase/sync-user";
import { ArunaQuickChat } from "@/features/aruna-intelligence/ui/ArunaQuickChat";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sincroniza Clerk user/org → Supabase (agora fail-silent)
  await syncUserToSupabase();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="ml-0 lg:ml-[68px] flex flex-1 flex-col relative">
        <Header />
        <main className="flex-1 p-4 pt-6 lg:p-6 lg:pt-8">{children}</main>
        {/* Assistente Global Aruna */}
        <ArunaQuickChat />
      </div>
    </div>
  );
}
