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
    <div className="relative p-8 text-white">

      {/* Background Glow */}
      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="absolute left-20 bottom-20 h-72 w-72 rounded-full bg-violet-600/5 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mb-8">

        <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm text-blue-400">
          Draft Management
        </div>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
          Content Drafts
        </h1>

        <p className="mt-3 text-lg text-zinc-400">
          Manage, edit and schedule your AI generated content.
        </p>

      </div>

      {/* Stats */}
      <div className="relative z-10 mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-zinc-400">
            Total Drafts
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {drafts.length}
          </h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-zinc-400">
            Ready To Publish
          </p>

          <h3 className="mt-3 text-4xl font-bold text-emerald-400">
            12
          </h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-zinc-400">
            Scheduled
          </p>

          <h3 className="mt-3 text-4xl font-bold text-blue-400">
            8
          </h3>
        </div>

      </div>

      {/* Draft Table */}
      <div
        className="
          relative z-10
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-gradient-to-br
          from-white/[0.04]
          to-white/[0.02]
          backdrop-blur-xl
        "
      >
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
                  className="
                    border-b border-white/5
                    transition-all duration-300
                    hover:bg-white/[0.03]
                  "
                >
                  <td className="p-5 text-white font-medium">
                    {draft.title}
                  </td>

                  <td className="p-5 text-zinc-300">
                    {draft.platform}
                  </td>

                  <td className="p-5">
                    <span
                      className="
                        rounded-full
                        border border-blue-500/20
                        bg-blue-500/10
                        px-3 py-1
                        text-xs
                        font-medium
                        text-blue-400
                      "
                    >
                      {draft.status}
                    </span>
                  </td>

                  <td className="p-5 text-zinc-400">
                    {new Date(
                      draft.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">

                      <button
                        onClick={() => {
                          window.location.href =
                            `/dashboard/calendar?draftId=${draft.id}`;
                        }}
                        className="
                          rounded-xl
                          bg-gradient-to-r
                          from-blue-600
                          to-violet-600
                          px-4 py-2
                          text-sm
                          font-medium
                          text-white
                          transition-all
                          duration-300
                          hover:scale-105
                        "
                      >
                        Schedule
                      </button>

                      <button
                        onClick={() =>
                          deleteDraft(draft.id)
                        }
                        className="
                          rounded-xl
                          bg-gradient-to-r
                          from-red-600
                          to-rose-600
                          px-4 py-2
                          text-sm
                          font-medium
                          text-white
                          transition-all
                          duration-300
                          hover:scale-105
                        "
                      >
                        Delete
                      </button>

                    </div>
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