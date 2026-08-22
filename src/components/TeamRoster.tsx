import Image from "next/image";
import { getTeamRosterBySlug } from "@/lib/data";
import type { TeamMember, TeamGroup } from "@/types/team-roster";

const THEME = {
  dark: {
    section: "bg-background",
    name: "text-white",
    role: "text-white/60",
    course: "text-white/40",
    placeholder: "border-white/20 bg-white/5 text-white/40",
    treeLine: "border-white/15",
  },
  light: {
    section: "bg-white",
    name: "text-[#0d0d0d]",
    role: "text-black/60",
    course: "text-black/40",
    placeholder: "border-black/20 bg-black/5 text-black/40",
    treeLine: "border-black/15",
  },
} as const;

type Theme = (typeof THEME)[keyof typeof THEME];

function MemberCard({ member, theme }: { member: TeamMember; theme: Theme }) {
  return (
    <div className="flex w-40 flex-col items-start text-left sm:w-48">
      <div className={`relative aspect-[4/5] w-full overflow-hidden ${!member.image ? `border border-dashed ${theme.placeholder}` : ""}`}>
        {member.image ? (
          <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className={`flex h-full w-full items-center justify-center text-center text-xs uppercase ${theme.placeholder}`}>
            Photo Coming Soon
          </div>
        )}
      </div>
      <p className={`mt-3 text-sm font-black tracking-tight uppercase ${theme.name}`}>{member.name}</p>
      <p className={`text-xs ${theme.role}`}>{member.role}</p>
      {member.course && <p className={`text-[11px] whitespace-nowrap ${theme.course}`}>{member.course}</p>}
    </div>
  );
}

function MemberRow({ members, theme }: { members: TeamMember[]; theme: Theme }) {
  return (
    <div className="flex flex-wrap justify-start gap-x-14 gap-y-8">
      {members.map((member) => (
        <MemberCard key={member.name} member={member} theme={theme} />
      ))}
    </div>
  );
}

function GroupBlock({
  group,
  theme,
  size = "sm",
}: {
  group: TeamGroup;
  theme: Theme;
  size?: "sm" | "lg";
}) {
  return (
    <div className="flex flex-col items-start">
      <p
        className={
          size === "lg"
            ? "text-left text-2xl font-black tracking-tight text-brand/80 uppercase sm:text-3xl"
            : "text-sm font-bold tracking-wide text-brand/80 uppercase"
        }
      >
        {group.name}
      </p>
      <div className={size === "lg" ? "mt-8" : "mt-4"}>
        <MemberRow members={group.members} theme={theme} />
      </div>
    </div>
  );
}

export function TeamRoster({ slug }: { slug: string }) {
  const roster = getTeamRosterBySlug(slug);
  if (!roster) return null;

  const theme = THEME[roster.theme];

  return (
    <section className={`border-b border-brand/40 px-6 py-16 sm:py-20 ${theme.section}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-28">
        {roster.leadership.length > 0 && (
          <div className="flex flex-col items-start">
            <p className="text-left text-4xl font-black tracking-tight text-brand uppercase sm:text-6xl">
              Our Team
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <div
                className="h-2.5 w-44 bg-brand sm:w-64"
                style={{ clipPath: "polygon(0 0, 94% 0, 100% 100%, 6% 100%)" }}
              />
              <div
                className="ml-8 h-2.5 w-24 bg-brand/50 sm:w-36"
                style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
              />
            </div>
            {roster.tagline && <p className={`mt-6 text-left ${theme.role}`}>{roster.tagline}</p>}
            <div className="mt-24 flex flex-col gap-14">
              {roster.leadership.map((group) => (
                <GroupBlock key={group.name} group={group} theme={theme} size="lg" />
              ))}
            </div>
          </div>
        )}

        {roster.departments.map((department) => (
          <div key={department.name} className="flex flex-col items-start">
            <p className="text-left text-2xl font-black tracking-tight text-brand/80 uppercase sm:text-3xl">
              {department.name}
            </p>

            {department.members && (
              <div className="mt-8">
                <MemberRow members={department.members} theme={theme} />
              </div>
            )}

            {department.groups && (
              <div
                className={
                  department.members || department.indentGroups
                    ? `mt-8 ml-8 flex flex-col gap-8 border-l-2 ${theme.treeLine} pl-8 sm:ml-12 sm:pl-12`
                    : "mt-8 flex flex-col gap-8"
                }
              >
                {department.groups.map((group) => (
                  <GroupBlock key={group.name} group={group} theme={theme} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
