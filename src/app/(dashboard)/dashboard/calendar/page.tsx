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
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold">
        Content Calendar
      </h1>

      <p className="mt-2 text-zinc-400">
        Schedule content for publishing.
      </p>

      {draftId && (
        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Schedule Draft
          </h3>

          <input
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) =>
              setScheduleDate(
                e.target.value
              )
            }
            className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-2"
          />

          <button
            onClick={scheduleDraft}
            disabled={saving}
            className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            {saving
              ? 'Scheduling...'
              : 'Save Schedule'}
          </button>
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-zinc-400">
              <th className="p-5">Title</th>
              <th className="p-5">Platform</th>
              <th className="p-5">Date</th>
              <th className="p-5">Status</th>
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
                  className="border-b border-white/5"
                >
                  <td className="p-5">
                    {event.title}
                  </td>

                  <td className="p-5">
                    {event.platform}
                  </td>

                  <td className="p-5">
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
                    {event.status}
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