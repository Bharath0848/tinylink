import { getLink } from "@/lib/linkService";

export default async function LinkStats({ params }: any) {
  const link = await getLink(params.code);

  if (!link) {
    return <div className="p-10">Not found</div>;
  }

  return (
    <main className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">
        Stats for: <span className="text-blue-600">{link.code}</span>
      </h1>

      <div className="border p-4 rounded space-y-2">
        <p><b>Target URL:</b> {link.targetUrl}</p>
        <p><b>Total Clicks:</b> {link.totalClicks}</p>
        <p><b>Created At:</b> {new Date(link.createdAt).toLocaleString()}</p>
        <p>
          <b>Last Clicked:</b>{" "}
          {link.lastClicked
            ? new Date(link.lastClicked).toLocaleString()
            : "Never"}
        </p>
      </div>
    </main>
  );
}
