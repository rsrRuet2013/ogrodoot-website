import { TeamDirectory } from "@/components/team/TeamDirectory";

export default function TeamPage() {
  return <main className="relative min-h-screen overflow-hidden bg-[#07090d] pb-4 pt-36"><div className="mars-grid-pattern absolute inset-0 opacity-40" /><div className="relative"><section className="mx-auto max-w-7xl px-5 pb-14 md:px-8"><p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">ROSB // personnel directory</p><h1 className="mars-glow-text mt-5 font-orbitron text-4xl font-bold text-slate-100 md:text-6xl">Current Team</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">The interdisciplinary students designing, building, and operating Team Ogrodoot&apos;s next rover.</p></section><TeamDirectory /></div></main>;
}
