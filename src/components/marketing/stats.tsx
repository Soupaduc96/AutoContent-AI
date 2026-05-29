export function Stats() {
  return (
    <div className="mx-auto mt-20 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h3 className="text-4xl font-bold">10x</h3>

        <p className="mt-2 text-zinc-400">
          Faster Content Production
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h3 className="text-4xl font-bold">24/7</h3>

        <p className="mt-2 text-zinc-400">
          Automated Publishing
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h3 className="text-4xl font-bold">5+</h3>

        <p className="mt-2 text-zinc-400">
          Social Platforms Connected
        </p>
      </div>
    </div>
  );
}