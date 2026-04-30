"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accessibility, BookOpenText, LibraryBig, UserRound } from "lucide-react";
import { WalletButton } from "@/components/shared/wallet-button";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/onboarding", label: "Onboarding", icon: Accessibility },
  { href: "/library", label: "Library", icon: LibraryBig },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-md text-sm font-medium">
          <BookOpenText className="h-5 w-5 text-primary" />
          <span>Sensory Passport</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center gap-2 rounded-lg border border-transparent px-3 text-sm text-muted-foreground transition",
                  active && "border-border bg-card text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <WalletButton />
      </div>
    </header>
  );
}
