export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-8 text-white">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Analytics Overview
        </h1>

        <p className="mt-2 text-zinc-400">
          Track performance across all platforms and campaigns.
        </p>
      </div>

      {/* Top Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Growth */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Content Growth
          </h2>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">
                Posts Generated
              </p>
              <p className="mt-2 text-3xl font-bold">
                245
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">
                Drafts Saved
              </p>
              <p className="mt-2 text-3xl font-bold">
                87
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">
                Scheduled Posts
              </p>
              <p className="mt-2 text-3xl font-bold">
                31
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">
                Published
              </p>
              <p className="mt-2 text-3xl font-bold">
                198
              </p>
            </div>
          </div>

          <div className="flex h-48 items-end gap-3">
            <div className="h-20 flex-1 rounded-t-xl bg-blue-500" />
            <div className="h-28 flex-1 rounded-t-xl bg-violet-500" />
            <div className="h-36 flex-1 rounded-t-xl bg-fuchsia-500" />
            <div className="h-24 flex-1 rounded-t-xl bg-pink-500" />
            <div className="h-40 flex-1 rounded-t-xl bg-rose-500" />
            <div className="h-32 flex-1 rounded-t-xl bg-green-500" />
            <div className="h-44 flex-1 rounded-t-xl bg-orange-500" />
          </div>
        </section>

        {/* Platform Performance */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Platform Performance
          </h2>

          {[
            ["Facebook", "82%"],
            ["Instagram", "76%"],
            ["LinkedIn", "61%"],
            ["TikTok", "69%"],
            ["YouTube", "47%"],
          ].map(([platform, score]) => (
            <div key={platform} className="mb-5">
              <div className="mb-2 flex justify-between">
                <span>{platform}</span>
                <span>{score}</span>
              </div>

              <div className="h-3 rounded-full bg-zinc-800">
                <div
                  className="h-3 rounded-full bg-violet-500"
                  style={{ width: score }}
                />
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reach by Platform */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Reach by Platform
          </h2>

          <div className="space-y-4">
            {[
              ["Facebook", "90%"],
              ["Instagram", "75%"],
              ["LinkedIn", "55%"],
              ["TikTok", "68%"],
              ["YouTube", "42%"],
            ].map(([platform, width]) => (
              <div key={platform}>
                <div className="mb-2 flex justify-between">
                  <span>{platform}</span>
                  <span>{width}</span>
                </div>

                <div className="h-4 rounded-full bg-zinc-800">
                  <div
                    className="h-4 rounded-full bg-cyan-500"
                    style={{ width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Breakdown */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Content Breakdown
          </h2>

          <div className="flex items-center justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-full border-[30px] border-violet-500">
              <div className="text-center">
                <p className="text-zinc-400">
                  Total Content
                </p>

                <p className="text-4xl font-bold">
                  245
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between">
              <span>Reels</span>
              <span>32%</span>
            </div>

            <div className="flex justify-between">
              <span>Carousels</span>
              <span>24%</span>
            </div>

            <div className="flex justify-between">
              <span>Stories</span>
              <span>18%</span>
            </div>

            <div className="flex justify-between">
              <span>Videos</span>
              <span>15%</span>
            </div>

            <div className="flex justify-between">
              <span>Posts</span>
              <span>11%</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}