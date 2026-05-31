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
     if (!response.ok) {
  setStats({
    postsGenerated: 0,
    scheduledPosts: 0,
    connectedPlatforms: 0,
  });
  return;
}
      }

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  const cards = [
    {
      title: 'Posts Generated',
      value: stats.postsGenerated,
      icon: '✍️',
      glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.20)]',
    },
    {
      title: 'Scheduled Posts',
      value: stats.scheduledPosts,
      icon: '📅',
      glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.20)]',
    },
    {
      title: 'Connected Platforms',
      value: stats.connectedPlatforms,
      icon: '🔗',
      glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.20)]',
    },
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-br
            from-zinc-900
            via-zinc-950
            to-black
            p-6
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-white/20
            ${card.glow}
          `}
        >
          {/* Glow Orb */}
          <div
            className="
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-blue-500/10
              blur-3xl
            "
          />

          {/* Top Accent Line */}
          <div
            className="
              absolute
              left-0
              top-0
              h-1
              w-0
              bg-gradient-to-r
              from-blue-500
              via-violet-500
              to-purple-500
              transition-all
              duration-500
              group-hover:w-full
            "
          />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">
                {card.title}
              </p>

              <h3 className="mt-4 text-5xl font-bold text-white">
                {card.value}
              </h3>
            </div>

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/5
                text-2xl
                backdrop-blur-xl
              "
            >
              {card.icon}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="text-emerald-400">
              ↑ 12%
            </span>

            <span className="text-zinc-500">
              vs last month
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}