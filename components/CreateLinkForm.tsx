"use client";

import { useState } from "react";

export default function CreateLinkForm() {
  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUrl, code }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed");
      setLoading(false);
      return;
    }

    window.location.reload(); // Refresh dashboard
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 border rounded space-y-4 bg-white"
    >
      <h2 className="text-xl font-semibold">Create New Link</h2>

      {error && <p className="text-red-600">{error}</p>}

      <input
        className="w-full border p-2 rounded"
        placeholder="Enter URL"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Custom code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
