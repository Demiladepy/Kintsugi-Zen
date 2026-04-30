import Link from "next/link";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { TxLink } from "@/components/shared/tx-link";

const prefs = [
  "Cognitive profile: Dyslexia, ADHD",
  "Font scale: 130%",
  "Contrast: High",
  "Reading complexity: Simplified",
  "Chunk length: Short paragraphs",
];

export default function ProfilePassportPage() {
  return (
    <section className="space-y-5">
      <ProfileHeader />
      <ProfileTabs />
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-h2">My Passport</h2>
          <Link href="/onboarding" className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm">
            Edit Passport
          </Link>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Last updated today · new updates create a transaction (~0.001 SOL).</p>
        <ul className="mb-5 space-y-2">
          {prefs.map((pref) => (
            <li key={pref} className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm">
              {pref}
            </li>
          ))}
        </ul>
        <div className="text-sm text-muted-foreground">
          Latest update: <TxLink signature="5b02cf2d89a0de333ab29f7a19c7de882123" />
        </div>
      </div>
    </section>
  );
}
