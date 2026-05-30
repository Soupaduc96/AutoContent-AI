'use client';

import { useEffect, useState } from 'react';

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

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold">
        Content Calendar
      </h1>

      <p className="mt-2 text-zinc-400">
        Schedule content for publishing.
      </p>

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
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}{' '}
  -
  {' '}
  {new Date(
    event.scheduled_for
  ).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })}
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