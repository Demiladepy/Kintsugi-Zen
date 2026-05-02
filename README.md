<div align="center">

# Sensory Passport

### Education that adapts to how you learn. On-chain.

A decentralized accessibility protocol on Solana. Mint one profile to your wallet, and every learning platform reformats itself for your brain.

[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?style=flat-square&logo=solana&logoColor=white)](https://solana.com)
[![Token-2022](https://img.shields.io/badge/Token--2022-NonTransferable-14F195?style=flat-square)](https://spl.solana.com/token-2022)
[![Built for](https://img.shields.io/badge/Built%20for-Frontier%20Onchain%201.0-FF6B35?style=flat-square)](https://solana.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

[**Live demo**](https://sensory-passport.vercel.app) · [**Pitch video**](https://youtube.com/watch?v=demo) · [**Docs**](./docs) · [**Frontend**](./apps/web) · [**Programs**](./programs)

</div>

---

## Explaination

Imagine you have a special card in your pocket. It's a magic card.

When you walk into a library and pick up a book, the words on the page change to fit your eyes. If you have trouble reading small letters, the letters get bigger. If you get distracted easily, the chapters get shorter. If long words confuse you, the book replaces them with simpler ones.

That's what **Sensory Passport** does — but for the internet. The "magic card" lives in your crypto wallet. Every time you visit a learning website that supports it, your card tells the site how your brain works best, and the site reshapes itself to help you learn.

When the website helps you, you tap a heart button. A tiny piece of money flows from your wallet to the person who made the original lesson, and to the person who first taught the AI how to adapt it for someone like you. Everyone who helps you wins a little bit.

That's it. That's the whole product.

---

## Why this exists

About 1 in 5 people has some kind of learning difference: dyslexia, ADHD, autism, low vision, or many others. Most educational content on the internet was made for the other 4 in 5.

The standard solutions today have three problems:

1. **Settings don't travel.** You can change the font on Wikipedia, but you have to change it again on YouTube, again on every textbook PDF, again everywhere. It's exhausting.
2. **Content creators have no incentive to make accessible versions.** It costs them time and money. There's no royalty for "this version of my lesson helped a dyslexic learner pass their exam."
3. **Accessibility is treated as charity, not infrastructure.** Big platforms add a "high contrast mode" toggle and call it done. The actual work of rewriting content for different cognitive profiles never happens at scale.

Sensory Passport flips all three.

Your accessibility profile lives on the blockchain in your own wallet, so it travels everywhere. AI does the rewriting work. And every time a rewritten version helps someone, the original creator and the person who triggered the adaptation both get paid in real money. The economy makes accessibility profitable instead of charitable.

---

## How it works (visual walkthrough)

### The three-step concept

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  1. Mint        │ →  │  2. Adapt       │ →  │  3. Earn        │
│                 │    │                 │    │                 │
│  Save how you   │    │  AI rewrites    │    │  Tiny payments  │
│  learn to your  │    │  any lesson to  │    │  flow when      │
│  wallet         │    │  fit your brain │    │  content helps  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### A real user journey

Let's follow Maya, a college student with dyslexia and ADHD.

**Day 1, 4:00 PM** — Maya hears about Sensory Passport from a friend. She visits the site, plays with the live demo on the homepage, and sees a paragraph of dense academic text reshape itself when she clicks "Dyslexia." She's curious.

**4:02 PM** — She clicks "Mint Your Passport." Her Phantom wallet pops up. She approves. The site walks her through three steps: which cognitive differences she has, what visual settings she likes, and how she prefers content delivered. The right side of the screen previews the platform reformatting itself in real time as she clicks options.

**4:05 PM** — She clicks "Mint." Her wallet asks her to sign one transaction. About 8 seconds later, she has a Sensory Passport NFT in her wallet that nobody (not even her) can transfer or sell. It's hers forever.

**4:06 PM** — She opens the library. She picks a Computer Science 101 module. The original is dense — long paragraphs, jargon-heavy. There's a banner: "This module can be adapted to your Sensory Passport. Adapt for me →"

**4:07 PM** — She clicks. A loading screen shows four steps happening live: reading her profile from the chain, generating an adapted version with AI, saving it permanently to Arweave, and recording the transformation on Solana. About 12 seconds.

**4:07:12 PM** — The same lesson, completely reformatted. Short paragraphs. Plain words. Subheadings every few paragraphs. Larger text. Higher contrast.

**4:25 PM** — She finishes the lesson. She actually learned it. She taps the heart button: "This helped me." Her wallet pops up: "Send 0.001 SOL? 70% goes to the original creator, 30% to the transformer." She approves. About $0.20 flows out of her wallet — half a cent.

**4:25:03 PM** — On the other side of the world, the original creator's wallet receives $0.14. The person whose previous adaptation helped train this one receives $0.06. They didn't have to do anything. The system just paid them.

That's the whole product, end to end.

---

## What you can do with it

### As a learner
- Mint a profile that describes how your brain works best
- Adapt any lesson in the library to your profile in about 12 seconds
- Save adapted lessons to your library forever (they live on Arweave)
- Update your profile anytime — your settings change, your passport changes
- Reward creators with micropayments when their content actually helps you

### As a creator
- Upload original content (text, with images coming soon)
- Set your royalty split (default: 70% creator, 30% transformer)
- Earn forever — every time anyone adapts your content and finds it helpful, you get paid
- See real-time analytics on which profiles your content serves best

### As a developer
- Use our SDK to read any user's accessibility profile from their wallet
- Build your own dApp that respects Sensory Passports
- The protocol is open source under MIT license

---

## Technical overview

### The architecture in three layers

```
┌──────────────────────────────────────────────────────────────────┐
│  CLIENT (Next.js + Wallet Adapter)                               │
│                                                                  │
│  Reads on-chain state directly via @solana/web3.js               │
│  Signs all transactions through Phantom or Solflare              │
└─────────┬─────────────────────────────────────┬──────────────────┘
          │                                     │
          │ Direct RPC reads                    │ HTTPS
          │ Wallet-signed txs                   │
          ▼                                     ▼
┌──────────────────────┐         ┌──────────────────────────────┐
│  SOLANA BLOCKCHAIN   │         │  NEXT.JS API ROUTES          │
│                      │         │                              │
│  • sensory_registry  │         │  • /api/transform (AI)       │
│    Anchor program    │         │  • /api/upload (Irys)        │
│  • passport_directory│         │  • /api/modules (indexer)    │
│    Anchor program    │         │  • /api/profile/[wallet]     │
│  • Token-2022 mints  │         │                              │
│    (NonTransferable) │         │  Stateless, serverless       │
└──────────┬───────────┘         └────────┬─────────────────────┘
           │                              │
           │                              ├─→ Anthropic Claude API
           │                              ├─→ Postgres indexer
           │                              └─→ Redis (cache + rate limit)
           │
           ▼
┌──────────────────────┐
│  ARWEAVE (via Irys)  │
│                      │
│  • Profile JSON      │
│  • Original content  │
│  • Adapted content   │
└──────────────────────┘
```

### The on-chain state

Two Anchor programs handle everything on-chain:

1. **`sensory_registry`** — registers content modules, records adaptations, splits payments between creators and transformers
2. **`passport_directory`** — maps a wallet to its Sensory Passport SBT for fast lookups

The passport itself is a **Token-2022 mint with the NonTransferable extension**. We don't write a custom SBT contract — the Solana token program already supports non-transferable tokens natively. The metadata pointer points to a profile JSON file pinned to Arweave.

### The data flow

When a user adapts a lesson, here's what happens behind the scenes:

```
USER CLICKS "ADAPT FOR ME"
        │
        ├─→ Frontend reads user's PassportRecord PDA from Solana
        │   to get the metadata URI on Arweave
        │
        ├─→ Frontend fetches profile JSON from Arweave (cached 5 min)
        │
        ├─→ Frontend POSTs to /api/transform/stream with a signed challenge
        │
        ├─→ Backend verifies signature, checks rate limit, checks cache
        │
        ├─→ If not cached:
        │     • Backend reads original content from Arweave
        │     • Backend builds prompt from profile + content
        │     • Backend streams response from Claude API
        │     • Backend uploads adapted version to Irys
        │     • Backend returns Arweave URI + content hash
        │
        └─→ Frontend asks user to sign record_adaptation transaction
              • Records on-chain: source module, transformer, archetype, URI
              • Increments adaptation_count on the source module
              • Now permanently part of the protocol's history
```

When the user later taps "this helped me," a separate transaction calls `appreciate(amount)` on the registry program. The program splits the SOL according to the creator's royalty setting (default 70/30) and updates earnings counters atomically.

### The tech stack

**Frontend**
- Next.js 14 with App Router and TypeScript
- Tailwind CSS, shadcn/ui, framer-motion
- Geist Sans (UI), Lora (reading), OpenDyslexic (loaded conditionally)
- Solana wallet adapter (Phantom, Solflare)

**Backend**
- Next.js API routes (serverless)
- Anthropic Claude API for content transformation
- Irys SDK for Arweave uploads (paid in SOL)
- Postgres on Neon for indexing
- Upstash Redis for caching and rate limiting

**Smart contracts**
- Anchor framework (Rust) for both programs
- Token-2022 with NonTransferable extension (no custom code, just config)
- Helius RPC for indexing and transaction submission

**Infrastructure**
- Vercel for frontend + API routes
- Railway for the indexer service (long-running)
- Devnet during hackathon, mainnet roadmap post-judging

---

## Why Solana

Solana isn't decoration on this project. It's load-bearing for one specific reason: **micropayments need to actually be micro**.

The whole creator-rewards economy depends on a learner being able to spend half a cent and have most of that half a cent reach the creator. On Ethereum, gas alone would eat the entire payment. On Solana, the gas is rounding error and the payment actually flows.

Three other things help:

- **Token-2022's NonTransferable extension** means we don't write a custom SBT program. Saved us two days of Anchor work.
- **Sub-second confirmation** means the demo flows feel instant. Users don't wait awkwardly after pressing buttons.
- **Helius's WebSocket infrastructure** lets our indexer subscribe to events in real time, so the library updates live as creators upload.

---

## Repository structure

```
sensory-passport/
├── apps/
│   └── web/                    # Next.js frontend + API routes
│       ├── app/
│       │   ├── (marketing)/    # Landing, about, creators
│       │   ├── (app)/          # Library, modules, profile
│       │   └── api/            # Backend routes
│       ├── components/
│       │   ├── ui/             # shadcn primitives
│       │   ├── marketing/      # Landing components
│       │   ├── onboarding/     # Profile builder
│       │   ├── reader/         # Module viewer & toolbar
│       │   └── shared/         # Wallet, nav, footer
│       ├── lib/
│       │   ├── solana/         # Web3.js helpers
│       │   ├── irys/           # Arweave uploads
│       │   └── ai/             # Claude prompt engine
│       └── stores/             # Zustand stores
│
├── programs/                   # Anchor programs
│   ├── sensory-registry/       # Modules, adaptations, payments
│   └── passport-directory/     # Wallet → SBT mapping
│
├── packages/
│   └── solana-client/          # Shared TypeScript SDK
│
├── services/
│   └── indexer/                # Standalone Postgres indexer
│
├── docs/                       # Architecture docs, diagrams
└── scripts/                    # Deploy, seed, backfill
```

---

## Getting started

### Prerequisites

You need:
- Node.js 20+ and pnpm 9+
- Rust 1.75+ and Solana CLI 1.18+
- Anchor CLI 0.30+
- A Phantom or Solflare wallet with some devnet SOL ([free faucet](https://faucet.solana.com))
- An Anthropic API key
- A Helius RPC API key (free tier works)

### Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/sensory-passport.git
cd sensory-passport
pnpm install
```

### Set up environment

Copy the example env file and fill in your keys:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Required variables:

```bash
SOLANA_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
SOLANA_NETWORK=devnet
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY
IRYS_PRIVATE_KEY=YOUR_FUNDED_KEYPAIR
DATABASE_URL=postgresql://localhost:5432/sensory
REDIS_URL=redis://localhost:6379
```

### Build and deploy programs

```bash
cd programs
anchor build
anchor deploy --provider.cluster devnet
```

Copy the deployed program IDs into your `.env.local` file.

### Run the dev server

```bash
cd apps/web
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the landing page with the live preview demo working.

### Run the indexer

In a separate terminal:

```bash
cd services/indexer
pnpm dev
```

The indexer subscribes to your devnet program logs and writes to Postgres.

---

## Roadmap

### Hackathon submission (now)
Profile minting, content adaptation, library, basic micropayments, single-user flow.

### Post-hackathon Q3 2026
Mobile-first responsive design, audio-first mode with TTS, video lesson support, creator analytics dashboard, mainnet deployment.

### Q4 2026
Cross-chain accessibility credentials (read profiles from Ethereum, Base, etc.), DAO governance for protocol parameters, on-chain reputation for high-quality transformers, partnership integrations with major edtech platforms.

### Long term
Zero-knowledge proofs of accessibility attributes (so users can prove "I qualify for accessibility features" without revealing which condition), enterprise tier for institutional content libraries, native localization for non-English learners.

---

## Privacy and ethics

We take this seriously because the project is about a vulnerable category of users.

**What lives on-chain:** wallet address, SBT mint, hash of profile JSON, content hashes, transaction history. None of this is personally identifying unless your wallet is publicly tied to your identity.

**What lives on Arweave:** profile preferences (cognitive categories you selected, font sizes, etc.), adapted content. Arweave is permanent and public — assume anyone can read it.

**What we never collect:** real names, emails, IP addresses, location data, or any analytics that ties activity to identity beyond the wallet.

**The hard tradeoff:** putting "I have dyslexia" on a public blockchain is medical disclosure. We accept this for the MVP and document it clearly. The roadmap includes ZK proofs as a privacy upgrade — proving your profile fits a category without revealing the underlying data.

If you're not comfortable with this tradeoff right now, please don't mint a passport that reveals more than you want public.

---

## Contributing

We welcome contributions, especially from:
- Educators willing to upload high-quality content
- Accessibility experts willing to review our transformation prompts
- Developers willing to audit our smart contracts
- People with the lived experience of learning differences willing to test the UX

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

---

## License

MIT. Build whatever you want. If your fork helps people, that's a win.

See [LICENSE](./LICENSE).

---

## Acknowledgments

Built for the **Frontier Onchain 1.0 hackathon** by Solana / Colosseum.

Standing on the shoulders of:
- **Anchor** — making Solana program development sane
- **Token-2022** — the NonTransferable extension saved us a custom contract
- **Irys** — making Arweave uploads feel like S3
- **Anthropic Claude** — the model that powers our content transformation
- **shadcn/ui** — beautiful primitives that don't get in the way
- **The accessibility community** — for decades of work telling tech companies what we should have been doing all along

---

<div align="center">

**Built with care for learners who deserve better.**

[Twitter](#) · [Discord](#) · [Documentation](./docs)

</div>
