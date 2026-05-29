"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black font-bold">
            ✦
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              AutoContent AI
            </h1>

            <p className="text-sm text-zinc-400">
              AI Automation
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#features"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </a>

          <a
            href="#faq"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">

          <Link
            href="/sign-in"
            className="rounded-xl border border-white/10 px-5 py-2 text-white hover:bg-white/10 transition-all"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-xl bg-white px-5 py-2 font-medium text-black hover:bg-zinc-200 transition-all"
          >
            Start Free
          </Link>

          <UserButton />

        </div>
      </div>
    </header>
  );
}