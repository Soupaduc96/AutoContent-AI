'use client';

import { useState } from 'react';

export default function GeneratePage() {
  const [businessType, setBusinessType] = useState('');
  const [platform, setPlatform] = useState('');
  const [tone, setTone] = useState('');
  const [goal, setGoal] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const businessTypes = [
    'Hotel', 'Restaurant', 'Realtor', 'Coach', 'Agency', 'Ecommerce',
    'Barbershop', 'Salon', 'Store', 'Gym', 'Dental Clinic', 'Medical Clinic',
    'Law Firm', 'Construction', 'Photography', 'Church', 'Nonprofit',
    'Influencer', 'Content Creator', 'Consultant',
  ];

  const platforms = ['LinkedIn', 'Facebook', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube'];
  const tones = ['Professional', 'Friendly', 'Luxury', 'Educational', 'Funny', 'Motivational'];
  const goals = ['Generate Leads', 'Increase Sales', 'Build Brand', 'Engagement', 'Book Appointments', 'Drive Traffic'];

  const templates = [
    { label: '🏨 Hotel Promotion', topic: 'Increase direct bookings for our hotel' },
    { label: '🍽️ Restaurant Special', topic: 'Promote our weekend special menu' },
    { label: '🏠 Realtor Listing', topic: 'Promote a new property listing' },
    { label: '✂️ Barbershop Offer', topic: 'Promote our haircut special offer' },
    { label: '💄 Salon Promotion', topic: 'Promote our beauty treatment package' },
    { label: '🛒 Ecommerce Sale', topic: 'Promote our seasonal sale' },
  ];

  const trendingIdeas = [
    'Summer Sale', 'Customer Testimonial', 'Behind The Scenes',
    'Local Business Growth', 'AI Marketing', 'Limited Time Offer',
  ];

  const handleGenerate = async () => {
    if (!businessType || !platform || !tone || !goal || !topic) {
      alert('Please complete all fields.');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessType, platform, tone, goal, topic }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');
      setGeneratedContent(data.content);
    } catch (error) {
      console.error(error);
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDraft = async () => {
    try {
      const response = await fetch('/api/content-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: topic || 'Untitled Draft',
          businessType, platform, tone, goal,
          content: generatedContent,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    } catch (error) {
      console.error(error);
      alert('Failed to save draft');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      {/* 1. max-w-7xl pou plis espas */}
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-4xl font-bold">Generate AI Content</h1>
        <p className="mb-8 text-zinc-400">
          Create social media posts tailored to your business in seconds.
        </p>

        {/* Stats cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Generated Today</p>
            <h3 className="mt-2 text-3xl font-bold">24</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Drafts Saved</p>
            <h3 className="mt-2 text-3xl font-bold">12</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Scheduled Posts</p>
            <h3 className="mt-2 text-3xl font-bold">8</h3>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* LEFT — Form */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="grid gap-4 md:grid-cols-3 mb-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Business Type</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white"
                >
                  <option value="" className="text-black">Select Business Type</option>
                  {businessTypes.map((item) => (
                    <option key={item} value={item} className="text-black">{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white"
                >
                  <option value="" className="text-black">Select Tone</option>
                  {tones.map((item) => (
                    <option key={item} value={item} className="text-black">{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white"
                >
                  <option value="" className="text-black">Select Goal</option>
                  {goals.map((item) => (
                    <option key={item} value={item} className="text-black">{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-zinc-400">Platform</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPlatform(item)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      platform === item
                        ? 'bg-blue-600 text-white'
                        : 'border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-zinc-400">Topic</label>
              <input
                type="text"
                placeholder="Example: How hotels can increase direct bookings"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm text-zinc-400">Popular Templates</p>
              <div className="flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button
                    key={template.label}
                    type="button"
                    onClick={() => setTopic(template.topic)}
                    className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700 transition"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={isGenerating}
              onClick={handleGenerate}
              className={`w-full rounded-xl px-6 py-4 font-semibold transition ${
                isGenerating
                  ? 'cursor-not-allowed bg-zinc-700 text-zinc-400'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isGenerating ? '⏳ Generating Content...' : '🚀 Generate AI Content'}
            </button>

          </div>

          {/* RIGHT — AI Preview */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI Preview</h2>
              {generatedContent && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      copied ? 'bg-green-700 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    }`}
                  >
                    {copied ? '✅ Copied' : '📋 Copy'}
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm hover:bg-blue-500 text-white transition"
                  >
                    🔄 Regenerate
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      draftSaved ? 'bg-green-700 text-white' : 'bg-green-600 hover:bg-green-500 text-white'
                    }`}
                  >
                    {draftSaved ? '✅ Saved' : '💾 Save Draft'}
                  </button>
                </div>
              )}
            </div>

            {generatedContent ? (
              <>
                <div className="flex-1 whitespace-pre-wrap rounded-xl border border-zinc-800 bg-black p-5 text-zinc-300 leading-relaxed overflow-auto">
                  {generatedContent}
                </div>
                <p className="mt-2 text-right text-xs text-zinc-600">
                  {generatedContent.length} characters
                </p>
              </>
            ) : (
              /* 2. Empty state amelyore */
              <div className="flex flex-1 min-h-[450px] items-center justify-center rounded-xl border border-dashed border-zinc-700">
                <div className="text-center px-6">
                  <div className="mb-4 text-5xl">✨</div>
                  <h3 className="mb-2 text-lg font-semibold text-white">AI Preview</h3>
                  <p className="text-sm text-zinc-500">
                    Generate content and watch the preview appear instantly.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
        {/* End two-column */}

        {/* 3. Trending Ideas */}
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Trending Ideas</h3>
          <div className="flex flex-wrap gap-3">
            {trendingIdeas.map((idea) => (
              <button
                key={idea}
                onClick={() => setTopic(idea)}
                className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700 transition"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}