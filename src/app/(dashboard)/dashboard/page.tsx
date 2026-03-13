import { DashboardOverview } from "@/features/dashboard-overview/ui/DashboardOverview";

export default function DashboardPage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.16))]">
      <DashboardOverview />
    </div>
  );
}
