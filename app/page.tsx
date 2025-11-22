export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import CreateLinkForm from "@/components/CreateLinkForm";
import LinksTable from "@/components/LinksTable";
import { getAllLinks } from "@/lib/linkService";

export default async function HomePage() {
  const links = await getAllLinks();

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-10">
      <h1 className="text-3xl font-bold">TinyLink Dashboard</h1>
      <CreateLinkForm />
      <LinksTable links={links} />
    </main>
  );
}
