import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";

const created = [
  { title: "A Structured Introduction to Compiler Pipelines", earnings: "0.089 SOL" },
  { title: "Failure Models in Distributed Systems", earnings: "0.051 SOL" },
];

const transformed = [
  { title: "Cell Membranes and Information Exchange", earnings: "0.027 SOL" },
  { title: "Trade Networks in the Mediterranean", earnings: "0.017 SOL" },
];

export default function ProfileContributionsPage() {
  return (
    <section className="space-y-5">
      <ProfileHeader />
      <ProfileTabs />
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 text-xl font-semibold">Modules I&apos;ve created</h2>
          <ul className="space-y-2">
            {created.map((item) => (
              <li key={item.title} className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2 text-sm">
                <span>{item.title}</span>
                <span className="font-medium text-success">{item.earnings}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 text-xl font-semibold">Transformations I&apos;ve made</h2>
          <ul className="space-y-2">
            {transformed.map((item) => (
              <li key={item.title} className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2 text-sm">
                <span>{item.title}</span>
                <span className="font-medium text-success">{item.earnings}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
