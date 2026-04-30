import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { TxLink } from "@/components/shared/tx-link";

const activity = [
  { text: "Adapted 'Failure Models in Distributed Systems' for your profile", sig: "4cc12ab90e11f2bc7731aa90dd21ef7ab299" },
  { text: "Updated passport contrast preference to high", sig: "2abf88bcde7291a337c18812fd9aef113201" },
  { text: "Appreciated an adapted biology module", sig: "7e992db2ac44de1811baf9122ab88cc55671" },
  { text: "Published new module: Linear Algebra for Vision", sig: "91ab22cf90ce88bc6f1234fe11dd23ab58ef" },
  { text: "Received creator payout split from adaptation", sig: "3bb9f01de77211bb78af40cce1aa299ad001" },
];

export default function ProfilePage() {
  return (
    <section className="space-y-5">
      <ProfileHeader />
      <ProfileTabs />
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 text-h2">Activity</h2>
        <p className="mb-3 text-sm text-muted-foreground">Reverse-chronological on-chain actions with references.</p>
        <ol className="space-y-3">
          {activity.map((item) => (
            <li key={item.sig} className="rounded-xl border border-border bg-background/60 p-3">
              <p className="mb-1 text-sm">{item.text}</p>
              <TxLink signature={item.sig} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
