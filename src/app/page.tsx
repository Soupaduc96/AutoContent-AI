import {
  StatsCards,
  ContentTable,
  AnalyticsChart,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <div className="space-y-8 p-8">

        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            Content Command Center
          </h1>

          <p className="mt-3 text-lg text-zinc-400">
            Everything you need in one place.
          </p>
        </div>

        <StatsCards />

        <ContentTable />

        <AnalyticsChart />

      </div>

    </main>
  );
}