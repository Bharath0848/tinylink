export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";
import { getLink, incrementClick } from "@/lib/linkService";

export async function GET(
  req: Request,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  const link = await getLink(code);

  if (!link || link.deleted) {
    return new NextResponse("Not found", { status: 404 });
  }

  await incrementClick(code);

  return NextResponse.redirect(link.targetUrl, 302);
}
