export function Features() {
  return (
    <section className="border-t border-white/10 bg-black py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            FEATURES
          </p>

          <h2 className="mt-4 text-5xl font-bold tracking-tight text-white">
            Everything You Need To Scale Content.
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            AI-powered workflows built for creators, agencies, coaches,
            realtors, and modern businesses.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-6 text-4xl">⚡</div>

            <h3 className="text-2xl font-semibold text-white">
              AI Content Generation
            </h3>

            <p className="mt-4 text-zinc-400">
              Generate captions, scripts, carousels, and social posts in
              seconds.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-6 text-4xl">📅</div>

            <h3 className="text-2xl font-semibold text-white">
              Smart Scheduling
            </h3>

            <p className="mt-4 text-zinc-400">
              Schedule content across TikTok, Instagram, YouTube, Facebook,
              LinkedIn, and more.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-6 text-4xl">🚀</div>

            <h3 className="text-2xl font-semibold text-white">
              Automated Publishing
            </h3>

            <p className="mt-4 text-zinc-400">
              Let AI publish your content automatically while you focus on
              growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}