"use client";

import { useState } from "react";

interface Model {
  id: string;
  name: string;
  slug: string;
  description: string;
  modelType: string;
  contextWindow: number;
  inputPrice: string;
  outputPrice: string;
  provider: {
    name: string;
    slug: string;
  };
}

export default function ModelSearch() {
  const [search, setSearch] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/models?search=${encodeURIComponent(search)}`
      );

      const result = await response.json();

      if (result.success) {
        setModels(result.data);
      } else {
        setModels([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setModels([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3 rounded-xl border border-[#272b36] bg-[#12151c] p-2"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search AI models, providers..."
          className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#9298a5]"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {searched && (
        <div className="mt-6">
          {loading ? (
            <p className="text-center text-[#9298a5]">
              Searching models...
            </p>
          ) : models.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-[#9298a5]">
                Found {models.length} model(s)
              </p>

              {models.map((model) => (
                <div
                  key={model.id}
                  className="rounded-xl border border-[#272b36] bg-[#12151c] p-5 transition hover:border-purple-500"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-purple-400">
                        {model.provider.name}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {model.name}
                      </h3>

                      <p className="mt-2 text-sm text-[#9298a5]">
                        {model.description}
                      </p>
                    </div>

                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                      {model.modelType}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#9298a5]">
                    <span>
                      Context: {model.contextWindow.toLocaleString()}
                    </span>

                    <span>
                      Input: ${Number(model.inputPrice).toFixed(2)}/1M
                    </span>

                    <span>
                      Output: ${Number(model.outputPrice).toFixed(2)}/1M
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-[#9298a5]">
              No models found. Try a different search.
            </p>
          )}
        </div>
      )}
    </div>
  );
}