import { NextRequest, NextResponse } from "next/server";
import { getLink, deleteLink } from "@/lib/linkService";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params; // await the Promise

  const link = await getLink(code);

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  const deleted = await deleteLink(code);

  if (!deleted) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
