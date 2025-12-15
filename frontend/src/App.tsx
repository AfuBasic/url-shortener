import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const API_BASE = "https://api.shortener.afuwapetunde.com";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const res = await fetch(`${API_BASE}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data: unknown = await res.json();

      if (!res.ok || !isShortenResponse(data)) {
        throw new Error((data as { error: string }).error);
      }

      setShortUrl(`${API_BASE}/${data.shortCode}`);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  const copy = useCallback(() => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    toast.success("URL Copied");

    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  }, [shortUrl]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        inputRef.current?.form?.requestSubmit();
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
        if (shortUrl) copy();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortUrl, copy]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-950 via-zinc-900 to-red-950 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900/70 backdrop-blur border border-slate-700 shadow-xl p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">URL Shortener</h1>
          <p className="text-slate-400 mt-2">
            Fast. Private. Built by a serious engineer.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-600 hover:bg-red-500 transition px-4 py-3 font-medium disabled:opacity-60"
          >
            {loading ? "Shortening…" : "Shorten URL"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        {shortUrl && (
          <div className="mt-6 rounded-lg bg-slate-800 border border-slate-700 p-4 flex items-center justify-between">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-red-400 hover:underline decoration-red-400 truncate"
            >
              {shortUrl}
            </a>
            <button
              onClick={copy}
              className="ml-4 text-sm text-slate-300 hover:text-white cursor-pointer"
            >
              Copy
            </button>
          </div>
        )}

        <footer className="mt-10 text-xs text-slate-500 text-center">
          Built with Node.js, TypeScript & algorithmic discipline
        </footer>
      </div>
    </div>
  );
}

// ---- types ----

type ShortenResponse = { shortCode: string };

function isShortenResponse(data: unknown): data is ShortenResponse {
  return typeof data === "object" && data !== null && "shortCode" in data;
}
