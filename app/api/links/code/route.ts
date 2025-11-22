import { NextResponse } from "next/server";
import { getLink, deleteLink } from "@/lib/linkService";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  const link = await getLink(code);

  if (!link || link.deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}

export async function DELETE(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  try {
    await deleteLink(code);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
