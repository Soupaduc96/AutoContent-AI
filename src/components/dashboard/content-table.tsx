'use client';

import { useEffect, useState } from 'react';

interface Draft {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export function ContentTable() {
  const [drafts, setDrafts] =
    useState<Draft[]>([]);

  useEffect(() => {
    loadDrafts();
  }, []);

  async function loadDrafts() {
    try {
      const response = await fetch(
        '/api/dashboard/recent-content'
      );

      const data = await response.json();

      setDrafts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-3xl font-bold text-white">
          Recent Content
        </h3>

        <button className="rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm text-white">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {drafts.length === 0 ? (
          <div className="rounded-2xl bg-black/40 p-5">
            <p className="text-zinc-400">
              No content yet.
            </p>
          </div>
        ) : (
          drafts.map((draft) => (
            <div
              key={draft.id}
              className="rounded-2xl bg-black/40 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {draft.title}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    {new Date(
                      draft.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

                <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-400">
                  {draft.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}