"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const tabs = [
  { href: "/profile/passport", label: "My Passport" },
  { href: "/profile/contributions", label: "My Contributions" },
  { href: "/profile/library", label: "My Library" },
  { href: "/profile", label: "Activity" },
];

export function ProfileTabs() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2">
      {tabs.map((tab) => {
        const active = tab.href === "/profile" ? pathname === "/profile" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "min-h-11 rounded-lg px-4 py-2 text-sm text-muted-foreground transition",
              active && "bg-background text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
