import { NextResponse } from "next/server";
import { createLink, getAllLinks } from "@/lib/linkService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetUrl, code } = body;

    const link = await createLink(targetUrl, code);
    return NextResponse.json(link, { status: 201 });
  } catch (err: any) {
    if (err.message === "Code already exists") {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET() {
  const links = await getAllLinks();
  return NextResponse.json(links);
}
