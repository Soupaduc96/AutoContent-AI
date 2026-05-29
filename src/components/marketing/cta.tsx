export function CTA() {
  return (
    <section className="border-t border-white/10 bg-black py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="rounded-[40px] border border-white/10 bg-white/5 p-16 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            START TODAY
          </p>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-white">
            Stop Posting Manually.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Automate your entire content workflow with AI-powered publishing,
            scheduling, and generation tools.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-zinc-200">
              Start Free Trial
            </button>

            <button className="rounded-full border border-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
              Book Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}