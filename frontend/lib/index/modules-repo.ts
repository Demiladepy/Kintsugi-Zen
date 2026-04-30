import { mockModules } from "@/lib/modules";
import type { z } from "zod";
import { moduleFilterSchema } from "@/lib/contracts/module";

type ModuleFilter = z.infer<typeof moduleFilterSchema>;

export async function listModules(filters: ModuleFilter) {
  let items = [...mockModules];
  if (filters.subject) {
    items = items.filter((m) => m.subject.toLowerCase().includes(filters.subject!.toLowerCase()));
  }
  if (filters.difficulty !== undefined) {
    const diffMap = ["Beginner", "Intermediate", "Advanced"] as const;
    items = items.filter((m) => m.difficulty === diffMap[filters.difficulty!]);
  }

  if (filters.sort === "popular") {
    items.sort((a, b) => b.adaptations - a.adaptations);
  } else if (filters.sort === "earnings") {
    items.sort((a, b) => b.appreciations - a.appreciations);
  }

  const limited = items.slice(0, filters.limit);
  return {
    items: limited.map((m) => ({
      id: m.id,
      creator: m.author,
      contentUri: `https://arweave.net/mock-${m.id}`,
      subject: ["Computer Science", "Mathematics", "Biology", "History", "Languages"].indexOf(m.subject),
      difficulty: ["Beginner", "Intermediate", "Advanced"].indexOf(m.difficulty),
      adaptationCount: m.adaptations,
      appreciationCount: m.appreciations,
      totalEarnedLamports: m.appreciations * 1000,
      createdAt: new Date().toISOString(),
    })),
    nextCursor: null,
  };
}
