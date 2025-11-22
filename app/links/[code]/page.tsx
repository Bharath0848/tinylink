export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { getLink } from "@/lib/linkService";

export default async function StatsPage({ params }: any) {
  const link = await getLink(params.code);

  if (!link) {
    return <div className="p-10 text-red-600">Not found</div>;
  }

  return (
    <main className="max-w-xl mx-auto p-10 space-y-4">
      <h1 className="text-2xl font-bold">Stats for: {link.code}</h1>

      <p><b>Target URL:</b> {link.targetUrl}</p>
      <p><b>Total Clicks:</b> {link.totalClicks}</p>
      <p><b>Created At:</b> {new Date(link.createdAt).toLocaleString()}</p>
      <p><b>Last Clicked:</b> {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "Never"}</p>
    </main>
  );
}
