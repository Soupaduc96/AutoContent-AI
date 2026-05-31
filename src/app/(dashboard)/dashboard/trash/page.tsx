export default function TrashPage() {
  return (
    <div className="space-y-8 p-8 text-white">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          🗑️ Trash
        </h1>

        <p className="mt-2 text-zinc-400">
          Restore deleted content or permanently remove it.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full border border-white/10 bg-white/5 p-6 text-6xl">
            🗑️
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Trash is Empty
          </h2>

          <p className="mt-3 max-w-md text-zinc-500">
            Deleted drafts, posts, and scheduled content will appear here.
          </p>

          <button className="mt-6 rounded-xl border border-white/10 bg-white/10 px-5 py-2 transition hover:bg-white/20">
            Go to Drafts
          </button>
        </div>
      </div>
    </div>
  );
}