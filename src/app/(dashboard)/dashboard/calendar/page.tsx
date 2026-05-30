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
  platform?: string;
}

const PLATFORM_ICONS: Record<string, string> = {
  Facebook: '📘',
  Instagram: '📸',
  LinkedIn: '💼',
  X: '🐦',
  TikTok: '🎵',
  YouTube: '▶️',
};

const STATUS_STYLES: Record<string, string> = {
  scheduled: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  published: 'bg-green-500/10 text-green-400 border border-green-500/20',
  draft: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20',
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState('');
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Facebook');
  const [scheduledFor, setScheduledFor] = useState('');

  useEffect(() => {
    loadEvents();
    loadDrafts();
  }, []);

  async function loadEvents() {
    try {
      const response = await fetch('/api/content-calendar');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load calendar events', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadDrafts() {
    try {
      const response = await fetch('/api/content-drafts');
      const data = await response.json();
      setDrafts(data);
    } catch (error) {
      console.error('Failed to load drafts', error);
    }
  }

  async function createEvent() {
    if (!title || !scheduledFor) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setSaving(true);

      const response = await fetch('/api/content-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftId: selectedDraftId,
          title,
          platform,
          scheduledFor,
        }),
      });

      if (!response.ok) throw new Error('Failed to schedule post');

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

  const selectClass =
    'w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur-sm transition focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30';

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-zinc-600 backdrop-blur-sm transition focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30';

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-8">

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-400 to-violet-500 bg-clip-text text-transparent leading-tight mb-2">
            Content Calendar
          </h1>
          <p className="text-zinc-400">Schedule and manage your social media posts.</p>
        </div>

        {/* Schedule form card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-lg font-semibold mb-5 text-zinc-200">Schedule a Post</h2>

          <div className="space-y-4">

            {/* Draft selector */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Select Draft (optional)
              </label>
              <select
                value={selectedDraftId}
                onChange={(e) => {
                  const draftId = e.target.value;
                  setSelectedDraftId(draftId);
                  const draft = drafts.find((d) => d.id === draftId);
                  if (draft) {
                    setTitle(draft.title);
                    if (draft.platform) setPlatform(draft.platform);
                  }
                }}
                className={selectClass}
              >
                <option value="" className="text-black bg-white">Select Draft</option>
                {drafts.map((draft) => (
                  <option key={draft.id} value={draft.id} className="text-black bg-white">
                    {draft.title}
                  </option>
                ))}
              </select>
              {drafts.length > 0 && (
                <p className="mt-1 text-xs text-zinc-600">{drafts.length} draft{drafts.length > 1 ? 's' : ''} available</p>
              )}
            </div>

            {/* Title, Platform, Date */}
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Title</label>
                <input
                  type="text"
                  placeholder="Post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className={selectClass}
                >
                  {Object.keys(PLATFORM_ICONS).map((p) => (
                    <option key={p} value={p} className="text-black bg-white">
                      {PLATFORM_ICONS[p]} {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Date & Time</label>
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={createEvent}
              disabled={saving}
              className={`w-full rounded-2xl py-4 font-semibold text-white transition-all duration-300 ${
                saving
                  ? 'cursor-not-allowed bg-white/10 text-zinc-500'
                  : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] active:scale-[0.98]'
              }`}
            >
              {saving ? '⏳ Scheduling...' : '📅 Create Schedule'}
            </button>

          </div>
        </div>

        {/* Events table */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-zinc-200">Scheduled Posts</h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Title</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Platform</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Date</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="p-6 text-zinc-500" colSpan={4}>
                    Loading events...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td className="p-6 text-zinc-500" colSpan={4}>
                    No scheduled content yet. Create your first schedule above.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-white/5 transition hover:bg-white/5"
                  >
                    <td className="p-4 text-sm text-zinc-200 font-medium">{event.title}</td>
                    <td className="p-4 text-sm text-zinc-400">
                      {PLATFORM_ICONS[event.platform] || '🌐'} {event.platform}
                    </td>
                    <td className="p-4 text-sm text-zinc-400">
                      {new Date(event.scheduled_for).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[event.status] || STATUS_STYLES['draft']}`}>
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
    </main>
  );
}