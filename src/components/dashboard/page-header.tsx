"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </button>

        <button
          type="button"
          onClick={() => router.forward()}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition hover:bg-zinc-800"
        >
          <ArrowRight className="h-4 w-4 text-white" />
        </button>
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-2 text-zinc-400">
        {description}
      </p>
    </div>
  );
}