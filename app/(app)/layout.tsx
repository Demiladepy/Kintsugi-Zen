import type { ReactNode } from "react";
import { Footer } from "@/components/shared/footer";
import { Nav } from "@/components/shared/nav";
import { WalletAppProvider } from "@/components/providers/wallet-provider";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <WalletAppProvider>
      <Nav />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8">{children}</main>
      <Footer />
    </WalletAppProvider>
  );
}
