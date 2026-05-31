import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-black">

      {/* Aurora Background */}
      <div className="pointer-events-none fixed inset-0 -z-20">

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div
          className="
            absolute
            left-[-10%]
            top-[-10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/10
            blur-[120px]
            animate-pulse
          "
        />

        <div
          className="
            absolute
            right-[-10%]
            bottom-[-10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-600/10
            blur-[120px]
            animate-pulse
          "
        />
      </div>

      <Sidebar />

      <main className="relative z-10 flex-1 overflow-y-auto">
        <Topbar />
        {children}
      </main>
    </div>
  );
}