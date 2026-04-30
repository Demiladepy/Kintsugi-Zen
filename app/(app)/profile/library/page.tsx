import Link from "next/link";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { mockModules } from "@/lib/modules";

export default function ProfileLibraryPage() {
  return (
    <section className="space-y-5">
      <ProfileHeader />
      <ProfileTabs />
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 text-h2">My Library</h2>
        <p className="mb-5 text-sm text-muted-foreground">Modules you read or adapt appear here. Continue reading picks are pinned first.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {mockModules.slice(0, 4).map((module) => (
            <Link key={module.id} href={`/modules/${module.id}/adapted`} className="rounded-xl border border-border bg-background/60 p-4 transition hover:border-primary/40">
              <p className="font-medium">{module.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {module.subject} · {module.difficulty}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
