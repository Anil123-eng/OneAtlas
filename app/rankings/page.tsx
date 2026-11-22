"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface RankingResult {
  id: string;
  score: number | string;
  model: {
    id: string;
    name: string;
    slug: string;
    modelType: string;
    provider: {
      name: string;
      slug: string;
    };
  };
}

interface Benchmark {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  results: RankingResult[];
}

export default function RankingsPage() {
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [selectedBenchmark, setSelectedBenchmark] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await fetch("/api/rankings");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Failed to fetch rankings");
        }

        setBenchmarks(result.data);

        if (result.data.length > 0) {
          setSelectedBenchmark(result.data[0].slug);
        }
      } catch {
        setError("Unable to load benchmark rankings.");
      } finally {
        setLoading(false);
      }
    }

    fetchRankings();
  }, []);

  const activeBenchmark = benchmarks.find(
    (benchmark) => benchmark.slug === selectedBenchmark
  );

  const filteredResults = activeBenchmark?.results.filter((result) =>
    result.model.name.toLowerCase().includes(search.toLowerCase())
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
            <Link href="/rankings" className="text-purple-400">
              Rankings
            </Link>
            <Link href="/providers" className="hover:text-white">
              Providers
            </Link>
            <Link href="/compare" className="hover:text-white">
              Compare
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-2 text-sm font-semibold tracking-widest text-purple-400">
          AI PERFORMANCE
        </div>

        <h1 className="mb-4 text-4xl font-bold">
          AI Model Rankings
        </h1>

        <p className="max-w-2xl text-gray-400">
          Compare AI models across industry benchmarks and discover
          top-performing models for different tasks.
        </p>

        {/* Benchmark Selector */}
        <div className="mt-10 flex flex-wrap gap-3">
          {benchmarks.map((benchmark) => (
            <button
              key={benchmark.id}
              onClick={() => {
                setSelectedBenchmark(benchmark.slug);
                setSearch("");
              }}
              className={`rounded-lg border px-5 py-3 text-sm font-medium transition ${
                selectedBenchmark === benchmark.slug
                  ? "border-purple-500 bg-purple-600 text-white"
                  : "border-[#272b36] bg-[#12151c] text-gray-400 hover:border-purple-500 hover:text-white"
              }`}
            >
              {benchmark.name}
            </button>
          ))}
        </div>

        {/* Benchmark Information */}
        {activeBenchmark && (
          <div className="mt-6 rounded-xl border border-[#272b36] bg-[#12151c] p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-md bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                {activeBenchmark.category}
              </span>

              <span className="text-sm text-gray-500">
                {activeBenchmark.results.length} models evaluated
              </span>
            </div>

            <h2 className="text-xl font-semibold">
              {activeBenchmark.name} Benchmark
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              {activeBenchmark.description}
            </p>
          </div>
        )}

        {/* Search */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search models in leaderboard..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-lg border border-[#272b36] bg-[#12151c] px-4 py-3 text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* Leaderboard */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#272b36]">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-[#12151c] text-sm text-gray-400">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Model</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Score</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Loading rankings...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-red-400"
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredResults && filteredResults.length > 0 ? (
                filteredResults.map((result, index) => (
                  <tr
                    key={result.id}
                    className="border-t border-[#272b36] transition hover:bg-[#12151c]"
                  >
                    <td className="px-6 py-5">
                      <span
                        className={`font-semibold ${
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                              ? "text-gray-300"
                              : index === 2
                                ? "text-orange-400"
                                : "text-gray-500"
                        }`}
                      >
                        {index === 0
                          ? "🥇 #1"
                          : index === 1
                            ? "🥈 #2"
                            : index === 2
                              ? "🥉 #3"
                              : `#${index + 1}`}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        href={`/models/${result.model.slug}`}
                        className="font-medium hover:text-purple-400"
                      >
                        {result.model.name}
                      </Link>
                    </td>

                    <td className="px-6 py-5 text-gray-400">
                      {result.model.provider.name}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-md bg-[#1a1e27] px-3 py-1 text-xs text-gray-300">
                        {result.model.modelType}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <span className="text-lg font-bold text-purple-400">
                        {Number(result.score).toFixed(1)}
                      </span>
                      <span className="ml-1 text-xs text-gray-500">
                        / 100
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No models found for this benchmark.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <p className="mt-5 text-xs text-gray-500">
          Benchmark scores shown are illustrative demo data for this
          platform and are not verified official results.
        </p>
      </section>
    </main>
  );
}