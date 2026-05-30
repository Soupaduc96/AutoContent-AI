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

  const goals = [
    'Generate Leads', 'Increase Sales', 'Build Brand',
    'Engagement', 'Book Appointments', 'Drive Traffic',
  ];

  const templates = [
    { label: '🏨 Hotel Promotion', topic: 'Increase direct bookings for our hotel' },
    { label: '🍽️ Restaurant Special', topic: 'Promote our weekend special menu' },
    { label: '🏠 Realtor Listing', topic: 'Promote a new property listing' },
    { label: '✂️ Barbershop Offer', topic: 'Promote our haircut special offer' },
    { label: '💄 Salon Promotion', topic: 'Promote our beauty treatment package' },
    { label: '🛒 Ecommerce Sale', topic: 'Promote our seasonal sale' },
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessType,
          platform,
          tone,
          goal,
          topic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

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
          businessType,
          platform,
          tone,
          goal,
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
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-2 text-4xl font-bold">Generate AI Content</h1>
        <p className="mb-8 text-zinc-400">
          Create social media posts tailored to your business in seconds.
        </p>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

          {/* Grid: Business Type, Tone, Goal */}
          <div className="grid gap-4 md:grid-cols-3 mb-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white"
              >
                <option value="" className="text-black">
                  Select Business Type
                </option>
                {businessTypes.map((item) => (
                  <option key={item} value={item} className="text-black">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white"
              >
                <option value="" className="text-black">
                  Select Tone
                </option>
                {tones.map((item) => (
                  <option key={item} value={item} className="text-black">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white"
              >
                <option value="" className="text-black">
                  Select Goal
                </option>
                {goals.map((item) => (
                  <option key={item} value={item} className="text-black">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Platform tabs */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Platform
            </label>
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

          {/* Topic input */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Topic
            </label>
            <input
              type="text"
              placeholder="Example: How hotels can increase direct bookings"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Popular templates */}
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

          {/* Generate button */}
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

        {/* Result section */}
        {generatedContent && (
          <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Generated Content</h2>
              <div className="flex flex-wrap gap-3">

                <button
                  onClick={handleCopy}
                  className={`rounded-lg px-4 py-2 transition ${
                    copied
                      ? 'bg-green-700 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {copied ? '✅ Copied' : '📋 Copy'}
                </button>

                <button
                  onClick={handleGenerate}
                  className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500 text-white transition"
                >
                  🔄 Regenerate
                </button>

                <button
                  onClick={handleSaveDraft}
                  className={`rounded-lg px-4 py-2 transition ${
                    draftSaved
                      ? 'bg-green-700 text-white'
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  {draftSaved ? '✅ Saved' : '💾 Save Draft'}
                </button>

              </div>
            </div>

            <div className="whitespace-pre-wrap rounded-xl border border-zinc-800 bg-black p-5 text-zinc-300 leading-relaxed">
              {generatedContent}
            </div>

            <p className="mt-2 text-right text-xs text-zinc-600">
              {generatedContent.length} characters
            </p>

          </div>
        )}

      </div>
    </main>
  );
}