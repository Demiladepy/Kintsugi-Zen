"use client";

import { useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { hasPassportForWallet } from "@/lib/solana/profile-sbt";

export function useProfile() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const address = wallet.publicKey?.toBase58();

  const query = useQuery({
    queryKey: ["profile", address],
    enabled: !!wallet.publicKey,
    queryFn: async () => {
      if (!wallet.publicKey) return { hasPassport: false };
      const local = localStorage.getItem(`sensory-passport:${wallet.publicKey.toBase58()}`);
      if (local) return { hasPassport: true, source: "local" as const };
      const hasPassport = await hasPassportForWallet(connection, new PublicKey(wallet.publicKey.toBase58()));
      return { hasPassport, source: "chain" as const };
    },
  });

  return useMemo(
    () => ({
      ...query,
      walletAddress: address,
      connected: wallet.connected,
    }),
    [query, address, wallet.connected],
  );
}
