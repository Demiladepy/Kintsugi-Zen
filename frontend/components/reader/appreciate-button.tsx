"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { TxLink } from "@/components/shared/tx-link";

export function AppreciateButton() {
  const [sent, setSent] = useState(false);
  const signature = "7f92ab31cd90e1f778a123449ab0de88211f";

  const onClick = async () => {
    toast.info("Rewards are stubbed in v1. On-chain split lands next.");
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
  };

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-4">
      <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">
        <Heart className={`h-4 w-4 ${sent ? "fill-current" : ""}`} />
        This helped me.
      </button>
      {sent && (
        <div className="mt-3 text-sm text-muted-foreground">
          <p>Stubbed payout preview: 0.0007 SOL creator / 0.0003 SOL transformer</p>
          <TxLink signature={signature} />
        </div>
      )}
    </div>
  );
}
