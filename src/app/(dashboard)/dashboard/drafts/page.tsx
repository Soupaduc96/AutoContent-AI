'use client';

import { useEffect, useState } from 'react';

interface Draft {
  id: string;
  title: string;
  platform: string;
  status: string;
  created_at: string;
}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrafts();
  }, []);

  async function loadDrafts() {
    try {
      const response = await fetch(
        '/api/content-drafts'
      );

      const data = await response.json();

      setDrafts(data);
    } catch (error) {
      console.error(
        'Failed to load drafts',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteDraft(
    draftId: string
  ) {
    const confirmed = window.confirm(
      'Delete this draft?'
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/content-drafts/${draftId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to delete draft'
        );
      }

      await loadDrafts();
    } catch (error) {
      console.error(error);

      alert('Failed to delete draft');
    }
  }

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
              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-zinc-500"
                >
                  Loading drafts...
                </td>
              </tr>
            ) : drafts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-zinc-500"
                >
                  No drafts yet.
                </td>
              </tr>
            ) : (
              drafts.map((draft) => (
                <tr
                  key={draft.id}
                  className="border-b border-white/5"
                >
                  <td className="p-5 text-white">
                    {draft.title}
                  </td>

                  <td className="p-5 text-zinc-300">
                    {draft.platform}
                  </td>

                  <td className="p-5">
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                      {draft.status}
                    </span>
                  </td>

                  <td className="p-5 text-zinc-400">
                    {new Date(
                      draft.created_at
                    ).toLocaleDateString()}
                  </td>
<td className="p-5 flex gap-2">
  <button
    onClick={() => {
      window.location.href =
        `/dashboard/calendar?draftId=${draft.id}`;
    }}
    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
  >
    Schedule
  </button>

  <button
    onClick={() =>
      deleteDraft(draft.id)
    }
    className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
  >
    Delete
  </button>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}