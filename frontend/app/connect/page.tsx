"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WalletAppProvider } from "@/components/providers/wallet-provider";
import { WalletButton } from "@/components/shared/wallet-button";
import { useProfile } from "@/hooks/use-profile";

export default function ConnectPage() {
  return (
    <WalletAppProvider>
      <ConnectContent />
    </WalletAppProvider>
  );
}

function ConnectContent() {
  const router = useRouter();
  const { connected, isLoading, data } = useProfile();

  useEffect(() => {
    if (!connected || isLoading) return;
    if (data?.hasPassport) router.replace("/library");
    else router.replace("/onboarding");
  }, [connected, isLoading, data?.hasPassport, router]);

  return (
    <section className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-border bg-card p-6 text-center">
      <h1 className="mb-2 text-h1">Connect to mint your Passport</h1>
      <p className="mb-6 text-sm text-muted-foreground">Your wallet is your account. No passwords, ever.</p>
      <div className="mb-4 flex justify-center">
        <WalletButton className="w-full max-w-xs justify-center" />
      </div>
      {isLoading && <p className="text-sm text-muted-foreground">Checking your passport status...</p>}
      <p className="mt-4 text-sm text-muted-foreground">
        Don&apos;t have a wallet?{" "}
        <Link href="https://phantom.app" target="_blank" rel="noreferrer" className="text-primary hover:underline">
          Get Phantom
        </Link>
      </p>
    </section>
  );
}
