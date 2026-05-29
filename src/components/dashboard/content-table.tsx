export function ContentTable() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-3xl font-bold text-white">
          Recent Content
        </h3>

        <button className="rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10">
          View All
        </button>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl bg-black/40 p-5 transition-all duration-300 hover:bg-white/5 hover:shadow-xl hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Instagram Reel - Marketing Tips
              </h3>

              <p className="mt-2 text-zinc-400">
                Scheduled for tomorrow
              </p>
            </div>

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
              Scheduled
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-black/40 p-5 transition-all duration-300 hover:bg-white/5 hover:shadow-xl hover:shadow-fuchsia-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                TikTok Script - AI Automation
              </h3>

              <p className="mt-2 text-zinc-400">
                Published 2 hours ago
              </p>
            </div>

            <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-400">
              Published
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}