import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

// const API_BASE = "https://api.shortener.afuwapetunde.com";
const API_BASE = "http://localhost:3000";

type ShortenResponse = { shortCode: string };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isShortenResponse(v: unknown): v is ShortenResponse {
  return isObject(v) && typeof v.shortCode === "string";
}

function getErrorMessage(v: unknown): string | null {
  if (isObject(v) && typeof v.error === "string") return v.error;
  return null;
}

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [clicks, setClicks] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Always display the short link using the CURRENT page's domain (your requirement)
  const shortUrl = useMemo(() => {
    if (!shortCode) return null;
    return `${API_BASE}/${shortCode}`;
  }, [shortCode]);

  const copy = useCallback(async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("URL copied");

      // Select input for quick paste-next flow
      setTimeout(() => inputRef.current?.select(), 0);
    } catch {
      toast.error("Copy failed");
    }
  }, [shortUrl]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmed = url.trim();
      if (!trimmed) {
        setError("Please enter a URL");
        return;
      }
      if (!API_BASE) {
        setError("Missing VITE_API_BASE (backend URL)");
        return;
      }

      setLoading(true);
      setError(null);
      setShortCode(null);
      setClicks(null);

      try {
        const res = await fetch(`${API_BASE}/shorten`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: trimmed }),
        });

        // Try to read JSON, but don't assume it always exists
        let data: unknown = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (!res.ok) {
          throw new Error(getErrorMessage(data) ?? "Unable to shorten URL");
        }

        if (!isShortenResponse(data)) {
          throw new Error("Unexpected server response");
        }

        setShortCode(data.shortCode);
        setClicks(0);

        toast.success("Short link created");
        setTimeout(() => inputRef.current?.select(), 0);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  // Keyboard-first UX
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      // Don't hijack shortcuts while user is typing in other inputs/textareas
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTypingField =
        tag === "input" ||
        tag === "textarea" ||
        (target as { isContentEditable: boolean })?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        // Cmd/Ctrl + Enter: submit
        inputRef.current?.form?.requestSubmit();
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
        // Cmd/Ctrl + C: copy short URL (only when not in typing fields)
        if (!isTypingField && shortUrl) {
          e.preventDefault();
          void copy();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copy, shortUrl]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-zinc-900 to-red-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900/70 backdrop-blur border border-slate-700 shadow-xl p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">URL Shortener</h1>
          <p className="text-slate-400 mt-2">
            Fast. Private. Built by a serious engineer.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            ref={inputRef}
            type="url"
            placeholder="afuwapetunde.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-600 hover:bg-red-500 transition px-4 py-3 font-medium disabled:opacity-60"
          >
            {loading ? "Shortening…" : "Shorten URL"}
          </button>

          <p className="text-xs text-slate-500">
            Shorten: <span className="text-slate-300">⌘/Ctrl + Enter</span> •
            Copy: <span className="text-slate-300">⌘/Ctrl + C</span>
          </p>
        </form>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        {shortCode && (
          <div className="mt-5 rounded-lg bg-slate-800 border border-slate-700 p-4">
            <div className="flex items-center justify-between gap-4">
              <a
                href={shortUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="text-red-400 hover:underline decoration-red-400 truncate"
              >
                {shortUrl}
              </a>

              <button
                type="button"
                onClick={() => void copy()}
                className="shrink-0 text-sm text-slate-300 hover:text-white"
              >
                Copy
              </button>
            </div>

            <LiveClicks
              code={shortCode}
              clicks={clicks}
              setClicks={setClicks}
            />
          </div>
        )}

        <footer className="mt-10 text-xs text-slate-500 text-center">
          Built with Node.js, TypeScript & algorithmic discipline • Red Edition
        </footer>
      </div>
    </div>
  );
}

type LiveClicksProps = {
  code: string;
  clicks: number | null;
  setClicks: React.Dispatch<React.SetStateAction<number | null>>;
};

function LiveClicks({ code, clicks, setClicks }: LiveClicksProps) {
  useEffect(() => {
    if (!API_BASE) return;

    const source = new EventSource(
      `${API_BASE}/events/${encodeURIComponent(code)}`
    );

    source.onmessage = (event) => {
      console.log(event);
      const value = Number(event.data);
      if (!Number.isNaN(value)) setClicks(value);
    };

    source.onerror = () => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, [code, setClicks]);

  return (
    <p className="mt-3 text-sm text-slate-400">
      Live clicks:{" "}
      <span className="text-red-400 font-medium">{clicks ?? "—"}</span>
    </p>
  );
}
