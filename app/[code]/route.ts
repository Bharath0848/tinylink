import { NextResponse } from "next/server";
import { getLink, incrementClick } from "@/lib/linkService";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  const link = await getLink(code);

  if (!link || link.deleted) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Update analytics
  await incrementClick(code);

  return NextResponse.redirect(link.targetUrl, 302);
}
