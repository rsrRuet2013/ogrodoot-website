import { notFound } from "next/navigation";
import { getTeamBySlug, TEAMS_META } from "@/lib/subteams";
import { TeamDetailView } from "@/components/team/TeamDetailView";
import type { Metadata } from "next";

export function generateStaticParams() {
  return TEAMS_META.flatMap((team) => [
    { slug: team.slug },
    ...team.aliases.map((alias) => ({ slug: alias })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlug(slug);
  if (!team) {
    return {
      title: "Team Not Found | Team Ogrodoot",
    };
  }

  return {
    title: `${team.name} Division | Team Ogrodoot`,
    description: team.description,
  };
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);

  if (!team) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white pt-28 pb-20">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-mars-red/15 via-mars-orange/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="mars-grid-pattern absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <TeamDetailView teamMeta={team} />
      </div>
    </main>
  );
}
