import {
  Sidebar,
  Topbar,
  StatsCards,
  ContentTable,
  GenerateModal,
  AnalyticsChart,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-black text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <div className="space-y-8 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl font-bold tracking-tight">
                Welcome back 👋
              </h1>

              <p className="mt-3 text-lg text-zinc-400">
                Manage your AI content automation system.
              </p>
            </div>

            <GenerateModal />
          </div>

          <StatsCards />

          <ContentTable />

          <AnalyticsChart />
        </div>
      </div>
    </main>
  );
}