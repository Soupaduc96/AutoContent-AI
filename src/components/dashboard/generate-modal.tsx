"use client";

import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export function GenerateModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-black transition hover:opacity-90"
      >
        <Sparkles className="h-5 w-5" />
        Generate Content
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Generate AI Content
                </h2>

                <p className="mt-2 text-zinc-400">
                  Create high-converting content with AI
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Content Type
                </label>

                <select className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none">
                  <option>Instagram Reel</option>
                  <option>TikTok Script</option>
                  <option>YouTube Video</option>
                  <option>Carousel Post</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Topic
                </label>

                <input
                  type="text"
                  placeholder="Enter your topic..."
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Tone
                </label>

                <select className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none">
                  <option>Professional</option>
                  <option>Funny</option>
                  <option>Luxury</option>
                  <option>Educational</option>
                </select>
              </div>

              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:opacity-90">
                <Sparkles className="h-5 w-5" />
                Generate With AI
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}