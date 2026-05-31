'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface CalendarEvent {
  id: string;
  title: string;
  platform: string;
  status: string;
  scheduled_for: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const draftId = searchParams.get('draftId');

  const [scheduleDate, setScheduleDate] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const response = await fetch(
        '/api/content-calendar'
      );

      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function scheduleDraft() {
    if (!draftId || !scheduleDate) {
      alert('Select a date');
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
            draftId,
            title: 'Scheduled Draft',
            platform: 'Facebook',
            scheduledFor:
              scheduleDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to schedule'
        );
      }

      await loadEvents();

      alert(
        'Draft scheduled successfully'
      );
    } catch (error) {
      console.error(error);

      alert('Scheduling failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative p-8 text-white">

      {/* Background Glow */}
      <div className="absolute right-20 top-32 h-64 w-64 rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="absolute left-20 bottom-20 h-64 w-64 rounded-full bg-violet-600/5 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mb-8">

        <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400">
          Content Scheduling Active
        </div>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
          Content Calendar
        </h1>

        <p className="mt-3 text-lg text-zinc-400">
          Plan, schedule and automate content publishing.
        </p>

      </div>

      {/* Stats */}
      <div className="relative z-10 mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-zinc-400">
            Scheduled Posts
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {events.length}
          </h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-zinc-400">
            This Week
          </p>

          <h3 className="mt-3 text-4xl font-bold text-emerald-400">
            12
          </h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-zinc-400">
            Auto Published
          </p>

          <h3 className="mt-3 text-4xl font-bold text-blue-400">
            27
          </h3>
        </div>

      </div>

      {/* Schedule Draft */}
      {draftId && (
        <div
          className="
            relative z-10 mb-8 overflow-hidden rounded-3xl
            border border-white/10
            bg-gradient-to-br
            from-blue-950/40
            via-black
            to-violet-950/30
            p-8
          "
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <h2 className="text-2xl font-semibold text-white">
            Schedule Draft
          </h2>

          <p className="mt-2 text-zinc-400">
            Choose when this content should be published.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) =>
                setScheduleDate(
                  e.target.value
                )
              }
              className="
                rounded-xl
                border border-white/10
                bg-black/40
                px-4 py-3
                text-white
                backdrop-blur-xl
              "
            />

            <button
              onClick={scheduleDraft}
              disabled={saving}
              className="
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-violet-600
                px-6 py-3
                font-medium
                text-white
                transition-all duration-300
                hover:scale-105
                disabled:opacity-50
              "
            >
              {saving
                ? 'Scheduling...'
                : 'Save Schedule'}
            </button>

          </div>
        </div>
      )}

      {/* Table */}
      <div
        className="
          relative z-10
          overflow-hidden rounded-3xl
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
              <th className="p-5">
                Title
              </th>

              <th className="p-5">
                Platform
              </th>

              <th className="p-5">
                Date
              </th>

              <th className="p-5">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-zinc-500"
                >
                  Loading...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-zinc-500"
                >
                  No scheduled content yet.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="
                    border-b border-white/5
                    transition-all duration-300
                    hover:bg-white/[0.03]
                  "
                >
                  <td className="p-5 text-white">
                    {event.title}
                  </td>

                  <td className="p-5">
                    <span
                      className="
                        rounded-full
                        border border-blue-500/20
                        bg-blue-500/10
                        px-3 py-1
                        text-xs
                        text-blue-400
                      "
                    >
                      {event.platform}
                    </span>
                  </td>

                  <td className="p-5 text-zinc-300">
                    {new Date(
                      event.scheduled_for
                    ).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}{' '}
                    -
                    {' '}
                    {new Date(
                      event.scheduled_for
                    ).toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                  </td>

                  <td className="p-5">
                    <span
                      className="
                        rounded-full
                        border border-emerald-500/20
                        bg-emerald-500/10
                        px-3 py-1
                        text-xs
                        font-medium
                        text-emerald-400
                      "
                    >
                      {event.status}
                    </span>
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