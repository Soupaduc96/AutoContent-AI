'use client';

import { useEffect, useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  platform: string;
  status: string;
  scheduled_for: string;
}

interface Draft {
  id: string;
  title: string;
  platform: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedDraftId, setSelectedDraftId] =
    useState('');

  const [title, setTitle] = useState('');
  const [platform, setPlatform] =
    useState('Facebook');
  const [scheduledFor, setScheduledFor] =
    useState('');

  useEffect(() => {
    loadEvents();
    loadDrafts();
  }, []);

  async function loadEvents() {
    try {
      const response = await fetch(
        '/api/content-calendar'
      );

      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.error(
        'Failed to load calendar events',
        error
      );
    } finally {
      setLoading(false);
    }
  }

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
    }
  }

  async function createEvent() {
    if (!title || !scheduledFor) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        '/api/content-calendar',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            draftId: selectedDraftId,
            title,
            platform,
            scheduledFor,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to schedule post'
        );
      }

      setSelectedDraftId('');
      setTitle('');
      setPlatform('Facebook');
      setScheduledFor('');

      await loadEvents();
    } catch (error) {
      console.error(error);

      alert('Failed to schedule post');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Content Calendar
        </h1>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Schedule Post
        </h2>

        <div className="space-y-4">

          <select
            value={selectedDraftId}
            onChange={(e) => {
              const draftId =
                e.target.value;

              setSelectedDraftId(
                draftId
              );

              const draft =
                drafts.find(
                  (d) =>
                    d.id === draftId
                );

              if (draft) {
                setTitle(
                  draft.title
                );

                if (
                  draft.platform
                ) {
                  setPlatform(
                    draft.platform
                  );
                }
              }
            }}
            className="border rounded-lg p-3 w-full"
          >
            <option value="">
              Select Draft
            </option>

            {drafts.map((draft) => (
              <option
                key={draft.id}
                value={draft.id}
              >
                {draft.title}
              </option>
            ))}
          </select>

          <div className="grid gap-4 md:grid-cols-3">

            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            >
              <option>
                Facebook
              </option>

              <option>
                Instagram
              </option>

              <option>
                LinkedIn
              </option>

              <option>X</option>

              <option>
                TikTok
              </option>

              <option>
                YouTube
              </option>
            </select>

            <input
              type="datetime-local"
              value={
                scheduledFor
              }
              onChange={(e) =>
                setScheduledFor(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />
          </div>

          <button
            onClick={createEvent}
            disabled={saving}
            className="px-5 py-3 rounded-lg bg-black text-white"
          >
            {saving
              ? 'Scheduling...'
              : 'Create Schedule'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4">
                Title
              </th>

              <th className="text-left p-4">
                Platform
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-left p-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  className="p-4"
                  colSpan={4}
                >
                  Loading...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td
                  className="p-4"
                  colSpan={4}
                >
                  No scheduled content yet.
                </td>
              </tr>
            ) : (
              events.map(
                (event) => (
                  <tr
                    key={
                      event.id
                    }
                    className="border-b"
                  >
                    <td className="p-4">
                      {
                        event.title
                      }
                    </td>

                    <td className="p-4">
                      {
                        event.platform
                      }
                    </td>

                    <td className="p-4">
                      {new Date(
                        event.scheduled_for
                      ).toLocaleString()}
                    </td>

                    <td className="p-4">
                      {
                        event.status
                      }
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}