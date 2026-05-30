export function AnalyticsChart() {
  const data = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 62 },
    { day: 'Wed', value: 78 },
    { day: 'Thu', value: 54 },
    { day: 'Fri', value: 88 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 98 },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/20 via-zinc-900 to-violet-950/20 p-6">
      
      {/* Header */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
        ↑ Analytics improving
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Growth Analytics
          </h3>

          <p className="mt-1 text-zinc-400">
            Content performance overview
          </p>
        </div>

        <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          +24.8% this month
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        
        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-gradient-to-br
          from-white/10
          to-white/5
          p-4
          transition-all
          duration-300
          hover:border-blue-500/30
          hover:scale-[1.02]
        "
        >
          <p className="text-sm text-zinc-400">
            Total Reach
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            124K
          </p>
        </div>

        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-gradient-to-br
          from-white/10
          to-white/5
          p-4
          transition-all
          duration-300
          hover:border-blue-500/30
          hover:scale-[1.02]
        "
        >
          <p className="text-sm text-zinc-400">
            Engagement
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            8.4%
          </p>
        </div>

        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-gradient-to-br
          from-white/10
          to-white/5
          p-4
          transition-all
          duration-300
          hover:border-blue-500/30
          hover:scale-[1.02]
        "
        >
          <p className="text-sm text-zinc-400">
            Posts Published
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            93
          </p>
        </div>

        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-gradient-to-br
          from-white/10
          to-white/5
          p-4
          transition-all
          duration-300
          hover:border-emerald-500/30
          hover:scale-[1.02]
        "
        >
          <p className="text-sm text-zinc-400">
            Growth
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            +24%
          </p>
        </div>
      </div>

      {/* Premium Chart */}
      <div className="flex h-[280px] items-end gap-4">
        {data.map((item) => (
          <div
            key={item.day}
            className="group flex flex-1 flex-col items-center gap-3"
          >
            <div
              className="
              relative
              w-full
              rounded-t-3xl
              bg-gradient-to-t
              from-blue-600
              to-violet-500
              shadow-[0_0_40px_rgba(99,102,241,0.35)]
              transition-all
              duration-300
              group-hover:scale-105
            "
              style={{
                height: `${item.value * 2}px`,
              }}
            >
              <div className="absolute inset-0 rounded-t-3xl bg-white/10" />

              <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-xl bg-black px-3 py-1 text-xs text-white shadow-xl group-hover:block">
                {item.value}K
              </div>
            </div>

            <span className="text-sm text-zinc-500">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}