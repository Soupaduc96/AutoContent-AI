import { AnalyticsChart } from '@/components/dashboard/analytics-chart';

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8 text-white">
      <div>
        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-zinc-400">
          Track your content performance.
        </p>
      </div>

      <AnalyticsChart />
    </div>
  );
}