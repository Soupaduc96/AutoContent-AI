export function Hero() {
  return (
    <section className="relative overflow-hidden">

    <div className="absolute inset-0 overflow-hidden">
  <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px]" />

  <div className="absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

  <div className="absolute right-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-[120px]" />
</div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center">
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
          AI Content Automation Platform
        </div>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Automate Your Content Across Every Platform.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
          Generate, schedule, and publish content for TikTok, Instagram,
          YouTube, Facebook, and LinkedIn — powered by AI workflows.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200">
            Start Free Trial
          </button>

          <button className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}