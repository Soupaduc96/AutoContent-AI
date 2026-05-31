import {
  StatsCards,
  ContentTable,
  AnalyticsChart,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="relative z-10">
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
      </div>
    </main>
  );
}