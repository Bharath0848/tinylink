"use client";

export default function LinksTable({ links }: any) {
  async function deleteLink(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Short Code</th>
          <th className="border p-2">Target URL</th>
          <th className="border p-2">Clicks</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link: any) => (
          <tr key={link.id}>
            <td className="border p-2">
              <a
                className="text-blue-600 underline"
                href={`/${link.code}`}
                target="_blank"
              >
                {link.code}
              </a>
            </td>

            <td className="border p-2">{link.targetUrl}</td>
            <td className="border p-2">{link.totalClicks}</td>

            <td className="border p-2 space-x-3">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${link.code}`
                  )
                }
                className="bg-gray-200 px-2 py-1 rounded"
              >
                Copy
              </button>

              <button
                onClick={() => deleteLink(link.code)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

              <a
                href={`/links/${link.code}`}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Stats
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
