

import Anthropic from "@anthropic-ai/sdk";
import { getSBT } from "./sbt";



export interface SensoryProfile {
  accessibility_type: string;
  high_contrast: boolean;
  simplified_language: boolean;
  larger_text: boolean;
  reduce_motion: boolean;
}

export interface AdaptResult {
  adapted_html: string;
  profile: SensoryProfile;
  cached: boolean;
}

// Simple in-memory cache  key: wallet + content hash


const adaptCache = new Map<string, string>();

function cacheKey(wallet: string, content: string): string {
  // Lightweight hash: wallet + first 120 chars of content
  return `${wallet}::${content.slice(0, 120)}`;
}


// Build the sensory profile from the SBT record


export function buildProfile(wallet: string): SensoryProfile {
  const record = getSBT(wallet);

  // If no SBT record found, fall back to a general 


  const accessibilityType = (record as any)?.accessibility_type ?? "general";

  return {
    accessibility_type: accessibilityType,
    high_contrast:       ["visual_impairment"].includes(accessibilityType),
    simplified_language: ["cognitive_impairment", "general", "visual_impairment"].includes(accessibilityType),
    larger_text:         ["visual_impairment", "motor_impairment"].includes(accessibilityType),
    reduce_motion:       ["cognitive_impairment"].includes(accessibilityType),
  };
}


// Core: adaptContent


export async function adaptContent(
  wallet: string,
  rawContent: string
): Promise<AdaptResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const profile = buildProfile(wallet);
  const key = cacheKey(wallet, rawContent);

  // Return cached result if available
  const cached = adaptCache.get(key);
  if (cached) {
    return { adapted_html: cached, profile, cached: true };
  }

  const client = new Anthropic({ apiKey });

  const systemPrompt = `You are an adaptive learning assistant for Kintsugi-Zen, \
a platform that makes education accessible for students with learning differences.

Your task: reformat educational content to match the user's sensory profile.

Output rules:
- Return ONLY valid HTML using these tags: <p>, <strong>, <em>, <ul>, <li>, <h3>, <blockquote>
- No markdown, no code fences, no preamble, no commentary
- Keep the science accurate — only the presentation changes`;

  const userPrompt = `Sensory Passport Profile:
- Accessibility type: ${profile.accessibility_type.replace(/_/g, " ")}
- Needs simplified language: ${profile.simplified_language}
- Needs high contrast layout: ${profile.high_contrast}
- Needs larger text layout: ${profile.larger_text}
- Reduce motion/complexity: ${profile.reduce_motion}

Adaptation instructions:
1. Add a <blockquote>Key Idea: ...</blockquote> summary in one plain sentence at the top
2. Rewrite body at Grade 6 reading level — short sentences, everyday words
3. Break into 3–4 short <p> blocks with breathing room
4. <strong>Bold</strong> the 3 most important terms
5. Replace every piece of jargon — if a term must stay, define it inline in plain brackets
6. If simplified_language is true, add a <ul> "Quick Facts" list of 3 bullet points at the end

Raw content to adapt:
${rawContent}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: userPrompt }],
    system: systemPrompt,
  });

  const adapted_html =
    message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("") || "<p>Could not adapt content.</p>";

  // Cache it
  adaptCache.set(key, adapted_html);

  return { adapted_html, profile, cached: false };
}
