export default function DraftsPage() {
  return (
    <div className="p-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Content Drafts
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your saved drafts.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-zinc-400">
              <th className="p-5">Title</th>
              <th className="p-5">Platform</th>
              <th className="p-5">Status</th>
              <th className="p-5">Created</th>
            </tr>
          </thead>

          <tbody>
  <tr>
    <td
      colSpan={4}
      className="p-10 text-center text-zinc-500"
    >
      No drafts yet.
    </td>
  </tr>
</tbody>
        </table>
      </div>
    </div>
  );
}