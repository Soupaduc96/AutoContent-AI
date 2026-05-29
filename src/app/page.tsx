import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Stats } from "@/components/marketing/stats";
import { Features } from "@/components/marketing/features";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />

        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-[30%] h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <Navbar />
      <Hero />
      <Stats />
      <DashboardPreview />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}