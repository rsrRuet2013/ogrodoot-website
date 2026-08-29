import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  badge?: string;
};

export function SectionPage({ eyebrow, title, description, children, badge }: SectionPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white pt-28 pb-20 sm:pb-28">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-mars-red/15 via-mars-orange/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-mars-orange/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Hero Header Container */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16 z-10">
        
        {/* Breadcrumb & Eyebrow */}
        <div className="flex items-center gap-2 mb-6 text-xs text-white/50">
          <Link href="/" className="hover:text-mars-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-mars-orange font-semibold">{title}</span>
        </div>

        <div className="flex flex-col gap-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange text-[11px] font-mono uppercase tracking-[0.25em] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-mars-orange animate-pulse" />
            {eyebrow}
          </div>

          <h1 className="font-heading font-black text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight m-0">
            {title}
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-white/75 font-normal leading-relaxed max-w-3xl mt-2">
            {description}
          </p>
        </div>
      </section>

      {/* Page Body Content */}
      {children && (
        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          {children}
        </section>
      )}
    </main>
  );
}
