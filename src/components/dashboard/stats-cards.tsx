export function StatsCards() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-fuchsia-500/10">
        <p className="text-zinc-400">
          Posts Generated
        </p>

        <h3 className="mt-4 text-5xl font-bold transition-transform duration-300 group-hover:scale-110">
          1,248
        </h3>
      </div>

      <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
        <p className="text-zinc-400">
          Scheduled Posts
        </p>

        <h3 className="mt-4 text-5xl font-bold transition-transform duration-300 group-hover:scale-110">
          312
        </h3>
      </div>

      <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-violet-500/10">
        <p className="text-zinc-400">
          Connected Platforms
        </p>

        <h3 className="mt-4 text-5xl font-bold transition-transform duration-300 group-hover:scale-110">
          5
        </h3>
      </div>
    </section>
  );
}