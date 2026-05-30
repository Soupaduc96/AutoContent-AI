'use client';

import { useEffect, useState } from 'react';

interface DashboardStats {
  postsGenerated: number;
  scheduledPosts: number;
  connectedPlatforms: number;
}

export function StatsCards() {
  const [stats, setStats] =
    useState<DashboardStats>({
      postsGenerated: 0,
      scheduledPosts: 0,
      connectedPlatforms: 0,
    });

  useEffect(() => {
    loadStats();
  }, []);

 async function loadStats() {
  try {
    const response = await fetch(
      '/api/dashboard/stats'
    );

    if (!response.ok) {
      throw new Error('Stats API not found');
    }

    const data = await response.json();

    setStats(data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10">
        <p className="text-zinc-400">
          Posts Generated
        </p>

        <h3 className="mt-4 text-5xl font-bold">
          {stats.postsGenerated}
        </h3>
      </div>

      <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10">
        <p className="text-zinc-400">
          Scheduled Posts
        </p>

        <h3 className="mt-4 text-5xl font-bold">
          {stats.scheduledPosts}
        </h3>
      </div>

      <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10">
        <p className="text-zinc-400">
          Connected Platforms
        </p>

        <h3 className="mt-4 text-5xl font-bold">
          {stats.connectedPlatforms}
        </h3>
      </div>
    </section>
  );
}