"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  Sparkles,
  Plug,
  PenSquare,
  Calendar,
  Zap,
  CheckCircle2,
} from "lucide-react";
const getLinkClass = (href: string, pathname: string) =>
  pathname === href
    ? "flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition-all duration-300"
    : "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-400 transition-all duration-300 hover:translate-x-1 hover:bg-white/5 hover:text-white";

const SectionLabel = ({ label }: { label: string }) => (
  <p className="mb-1 mt-4 px-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
    {label}
  </p>
);

const SoonLink = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-600 cursor-not-allowed">
    {icon}
    <span>{label}</span>
    <span className="ml-auto rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500">
      Soon
    </span>
  </div>
);

export function DashboardNav({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    onLinkClick?.();
  };

  return (
    <nav className="px-3 pb-4">

      <SectionLabel label="Main" />
      <Link
        href="/dashboard"
        className={getLinkClass("/dashboard", pathname)}
        onClick={handleLinkClick}
      >
        <LayoutDashboard size={16} />
        Dashboard
      </Link>

      <SectionLabel label="Content" />
      <Link
        href="/dashboard/generate"
        className={getLinkClass("/dashboard/generate", pathname)}
        onClick={handleLinkClick}
      >
        <PenSquare size={16} />
        Generate
      </Link>
      <Link
        href="/dashboard/drafts"
        className={getLinkClass("/dashboard/drafts", pathname)}
        onClick={handleLinkClick}
      >
        <FileText size={16} />
        Drafts
      </Link>
      <Link
        href="/dashboard/calendar"
        className={getLinkClass("/dashboard/calendar", pathname)}
        onClick={handleLinkClick}
      >
        <Calendar size={16} />
        Calendar
      </Link>

      <SectionLabel label="Social" />
      <Link
        href="/platforms"
        className={getLinkClass("/platforms", pathname)}
        onClick={handleLinkClick}
      >
        <Plug size={16} />
        Platforms
      </Link>
      <Link
        href="/dashboard/analytics"
        className={getLinkClass("/dashboard/analytics", pathname)}
        onClick={handleLinkClick}
      >
        <BarChart3 size={16} />
        Analytics
      </Link>

      <SectionLabel label="AI" />
      <SoonLink icon={<Zap size={16} />} label="Automations" />
      <SoonLink icon={<CheckCircle2 size={16} />} label="Approvals" />

      <SectionLabel label="Account" />
      <Link
        href="/dashboard/trash"
        className={getLinkClass("/dashboard/trash", pathname)}
        onClick={handleLinkClick}
      >
        <span className="text-base">🗑️</span>
        Trash
      </Link>

      <Link
        href="/billing"
        className={getLinkClass("/billing", pathname)}
        onClick={handleLinkClick}
      >
        <CreditCard size={16} />
        Billing
      </Link>

      <Link
        href="/settings"
        className={getLinkClass("/settings", pathname)}
        onClick={handleLinkClick}
      >
        <Settings size={16} />
        Settings
      </Link>
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-[260px] flex-col justify-between border-r border-white/10 bg-black/60 backdrop-blur-xl lg:flex">
      <div>

        {/* Logo */}
<Link
  href="/dashboard"
  className="
    group
    flex
    items-center
    gap-3
    border-b
    border-white/10
    p-5
    transition-all
    duration-300
    hover:bg-white/5
  "
>
  <Image
    src="/logo.png"
    alt="AutoContent AI"
    width={44}
    height={44}
    className="
      rounded-xl
      transition-all
      duration-300
      group-hover:scale-110
    "
  />

  <div>
    <h2 className="text-base font-bold leading-none text-white">
      AutoContent AI
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
      AI Marketing Platform
    </p>
  </div>
</Link>

        {/* Nav */}
        <DashboardNav />
      </div>

      {/* 2. Upgrade Card amelyore */}
      <div className="p-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-5">
          <p className="text-xs font-semibold text-blue-400">AutoContent AI Pro</p>
          <div className="mt-3 space-y-2">
            {[
              'Unlimited Content',
              'Priority AI',
              'Auto Publishing',
              'Advanced Analytics',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-green-400">✓</span>
                {feature}
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105">
            Upgrade Plan
          </button>
        </div>
      </div>

    </aside>
  );
}