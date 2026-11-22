"use client";

import { useEffect, useState } from "react";

interface Model {
  id: string;
  name: string;
  slug: string;
  description: string;
  modelType: string;
  contextWindow: number;
  inputPrice: string;
  outputPrice: string;
  modalities: string[];
  capabilities: string[];
  provider: {
    name: string;
    slug: string;
  };
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (provider) params.set("provider", provider);
        if (type) params.set("type", type);
        if (sort) params.set("sort", sort);

        const response = await fetch(`/api/models?${params.toString()}`);
        const result = await response.json();

        if (result.success) {
          setModels(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [search, provider, type, sort]);

  const providers = Array.from(
    new Set(models.map((model) => model.provider.slug))
  );

  const modelTypes = Array.from(
    new Set(models.map((model) => model.modelType))
  );

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-[#272b36] px-6 py-5 md:px-12">
        <a href="/" className="text-2xl font-bold tracking-tight">
          One<span className="text-purple-500">Atlas</span>
          <span className="ml-1 text-sm text-gray-500">.dev</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
          <a href="/models" className="text-white">
            Models
          </a>
          <a href="/rankings" className="hover:text-white">
            Rankings
          </a>
          <a href="/providers" className="hover:text-white">
            Providers
          </a>
          <a href="/compare" className="hover:text-white">
            Compare
          </a>
        </div>

        <a
          href="/"
          className="rounded-lg border border-[#333744] px-4 py-2 text-sm hover:bg-[#1a1e27]"
        >
          Home
        </a>
      </nav>

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-purple-400">
            AI MODEL DISCOVERY
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Explore AI Models
          </h1>

          <p className="mt-3 text-gray-400">
            Discover, search, and filter AI models from leading providers.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search models..."
            className="w-full rounded-xl border border-[#272b36] bg-[#12151c] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Provider Filter */}
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Provider
            </label>

            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full rounded-lg border border-[#272b36] bg-[#12151c] px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              <option value="">All Providers</option>

              {providers.map((providerSlug) => (
                <option key={providerSlug} value={providerSlug}>
                  {models.find(
                    (model) => model.provider.slug === providerSlug
                  )?.provider.name}
                </option>
              ))}
            </select>
          </div>

          {/* Model Type Filter */}
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Model Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-[#272b36] bg-[#12151c] px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              <option value="">All Types</option>

              {modelTypes.map((modelType) => (
                <option key={modelType} value={modelType}>
                  {modelType}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Sort By
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-lg border border-[#272b36] bg-[#12151c] px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price">Lowest Input Price</option>
              <option value="context">Largest Context Window</option>
              <option value="newest">Newest Models</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Available Models</h2>

          <p className="text-sm text-gray-400">
            {models.length} models found
          </p>
        </div>

        {/* Model Cards */}
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading models...
          </div>
        ) : models.length === 0 ? (
          <div className="rounded-xl border border-[#272b36] bg-[#12151c] py-20 text-center">
            <h3 className="text-lg font-semibold">No models found</h3>

            <p className="mt-2 text-sm text-gray-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <div
                key={model.id}
                className="rounded-xl border border-[#272b36] bg-[#12151c] p-6 transition hover:border-purple-500/50"
              >
                {/* Provider and Type */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-xl font-bold text-purple-400">
                    {model.provider.name.charAt(0)}
                  </div>

                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                    {model.modelType}
                  </span>
                </div>

                {/* Model Name */}
                <h3 className="mt-5 text-lg font-semibold">
                  {model.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {model.provider.name}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-gray-400">
                  {model.description}
                </p>

                {/* Specifications */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#272b36] pt-4">
                  <div>
                    <p className="text-xs text-gray-500">
                      Context Window
                    </p>

                    <p className="mt-1 font-medium">
                      {model.contextWindow.toLocaleString()} tokens
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Input Price
                    </p>

                    <p className="mt-1 font-medium">
                      ${Number(model.inputPrice).toFixed(2)} / 1M
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Output Price
                    </p>

                    <p className="mt-1 font-medium">
                      ${Number(model.outputPrice).toFixed(2)} / 1M
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Modalities
                    </p>

                    <p className="mt-1 font-medium">
                      {model.modalities.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {model.capabilities.slice(0, 3).map((capability) => (
                    <span
                      key={capability}
                      className="rounded-md bg-[#1a1e27] px-2 py-1 text-xs text-gray-400"
                    >
                      {capability}
                    </span>
                  ))}
                </div>

               {/* Details Button */}
<a
  href={`/models/${model.slug}`}
  className="mt-5 block w-full rounded-lg border border-[#333744] py-2.5 text-center text-sm transition hover:bg-[#1a1e27]"
>
  View Details →
</a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}