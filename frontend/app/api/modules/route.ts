import { NextResponse } from "next/server";
import { buildError } from "@/lib/contracts/errors";
import { moduleFilterSchema, modulesListResponseSchema } from "@/lib/contracts/module";
import { listModules } from "@/lib/index/modules-repo";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const parsed = moduleFilterSchema.safeParse({
      subject: url.searchParams.get("subject") ?? undefined,
      difficulty: url.searchParams.get("difficulty") ?? undefined,
      sort: url.searchParams.get("sort") ?? "newest",
      cursor: url.searchParams.get("cursor") ?? undefined,
      limit: url.searchParams.get("limit") ?? 20,
    });
    if (!parsed.success) {
      return NextResponse.json(buildError("INTERNAL", "Invalid module filters", parsed.error.flatten()), { status: 400 });
    }
    const data = await listModules(parsed.data);
    return NextResponse.json(modulesListResponseSchema.parse(data));
  } catch (error) {
    return NextResponse.json(buildError("INTERNAL", error instanceof Error ? error.message : "Failed to list modules"), { status: 500 });
  }
}
