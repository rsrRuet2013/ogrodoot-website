type SectionPageProps = { eyebrow: string; title: string; description: string };

export function SectionPage({ eyebrow, title, description }: SectionPageProps) {
  return <main className="relative min-h-screen overflow-hidden bg-[#0a0b0e] px-6 pt-40 text-slate-100"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(71,85,105,0.28),transparent_36rem)]" /><section className="relative mx-auto max-w-4xl border-l border-slate-600/70 pl-7 md:pl-10"><p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p><h1 className="mt-5 font-orbitron text-4xl font-bold tracking-tight md:text-6xl">{title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{description}</p></section></main>;
}
