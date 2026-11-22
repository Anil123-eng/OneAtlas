"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AIModel {
  id: string;
  name: string;
  slug: string;
  modelType: string;
  contextWindow: number;
  inputPrice: number | string;
  outputPrice: number | string;
}

interface Provider {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
  models: AIModel[];
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProviders() {
      try {
        const response = await fetch("/api/providers");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Failed to fetch providers");
        }

        setProviders(result.data);
      } catch {
        setError("Unable to load AI providers.");
      } finally {
        setLoading(false);
      }
    }

    fetchProviders();
  }, []);

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      {/* Navigation */}
      <nav className="border-b border-[#272b36] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            OneAtlas<span className="text-purple-400">.dev</span>
          </Link>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/models" className="hover:text-white">
              Models
            </Link>
            <Link href="/rankings" className="hover:text-white">
              Rankings
            </Link>
            <Link href="/providers" className="text-purple-400">
              Providers
            </Link>
            <Link href="/compare" className="hover:text-white">
              Compare
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-2 text-sm font-semibold tracking-widest text-purple-400">
          AI ECOSYSTEM
        </div>

        <h1 className="mb-4 text-4xl font-bold">
          AI Providers
        </h1>

        <p className="max-w-2xl text-gray-400">
          Explore leading AI research laboratories and technology
          companies. Discover their models, capabilities, and
          innovations.
        </p>

        {/* Stats */}
        {!loading && !error && (
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-xl border border-[#272b36] bg-[#12151c] px-6 py-4">
              <p className="text-sm text-gray-400">
                AI Providers
              </p>
              <p className="mt-1 text-2xl font-bold text-purple-400">
                {providers.length}
              </p>
            </div>

            <div className="rounded-xl border border-[#272b36] bg-[#12151c] px-6 py-4">
              <p className="text-sm text-gray-400">
                Available Models
              </p>
              <p className="mt-1 text-2xl font-bold text-purple-400">
                {providers.reduce(
                  (total, provider) => total + provider.models.length,
                  0
                )}
              </p>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search AI providers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-lg border border-[#272b36] bg-[#12151c] px-4 py-3 text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* Provider Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="col-span-full py-12 text-center text-gray-400">
              Loading providers...
            </p>
          ) : error ? (
            <p className="col-span-full py-12 text-center text-red-400">
              {error}
            </p>
          ) : filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="flex flex-col rounded-xl border border-[#272b36] bg-[#12151c] p-6 transition hover:border-purple-500/50 hover:bg-[#1a1e27]"
              >
                {/* Provider Header */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15 text-xl font-bold text-purple-400">
                    {provider.name.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {provider.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {provider.models.length}{" "}
                      {provider.models.length === 1
                        ? "model"
                        : "models"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 min-h-[48px] text-sm leading-6 text-gray-400">
                  {provider.description ||
                    "AI technology provider."}
                </p>

                {/* Models */}
                <div className="mt-5">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Models
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {provider.models.slice(0, 4).map((model) => (
                      <Link
                        key={model.id}
                        href={`/models/${model.slug}`}
                        className="rounded-md border border-[#272b36] bg-[#0b0d12] px-3 py-2 text-xs text-gray-300 transition hover:border-purple-500 hover:text-purple-400"
                      >
                        {model.name}
                      </Link>
                    ))}

                    {provider.models.length > 4 && (
                      <span className="rounded-md bg-[#1a1e27] px-3 py-2 text-xs text-gray-500">
                        +{provider.models.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Website */}
                <div className="mt-auto pt-6">
                  {provider.website && (
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300"
                    >
                      Official Website
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full py-12 text-center text-gray-400">
              No providers found.
            </p>
          )}
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-xs text-gray-500">
          Provider information and model listings are managed
          through the OneAtlas database.
        </p>
      </section>
    </main>
  );
}