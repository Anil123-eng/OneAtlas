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
  benchmarks: {
    score: string;
    benchmark: {
      name: string;
      slug: string;
      category: string;
    };
  }[];
}

export default function ComparePage() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch("/api/models");
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
  }, []);

  const comparisonModels = models.filter((model) =>
    selectedModels.includes(model.id)
  );

  function handleModelSelection(modelId: string) {
    setSelectedModels((previous) => {
      if (previous.includes(modelId)) {
        return previous.filter((id) => id !== modelId);
      }

      if (previous.length >= 3) {
        return previous;
      }

      return [...previous, modelId];
    });
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-[#272b36] px-6 py-5 md:px-12">
        <a href="/" className="text-2xl font-bold tracking-tight">
          One<span className="text-purple-500">Atlas</span>
          <span className="ml-1 text-sm text-gray-500">.dev</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
          <a href="/models" className="hover:text-white">
            Models
          </a>

          <a href="/rankings" className="hover:text-white">
            Rankings
          </a>

          <a href="/providers" className="hover:text-white">
            Providers
          </a>

          <a href="/compare" className="text-white">
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
            MODEL COMPARISON
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Compare AI Models
          </h1>

          <p className="mt-3 text-gray-400">
            Compare specifications, pricing, capabilities, and performance.
          </p>
        </div>

        {/* Model Selection */}
        <div className="mb-8 rounded-2xl border border-[#272b36] bg-[#12151c] p-6">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Select Models
            </h2>

            <p className="text-sm text-gray-400">
              {selectedModels.length} / 3 selected
            </p>
          </div>

          {loading ? (
            <p className="py-8 text-center text-gray-400">
              Loading models...
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {models.map((model) => {
                const isSelected = selectedModels.includes(model.id);

                return (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelection(model.id)}
                    disabled={!isSelected && selectedModels.length >= 3}
                    className={`rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-[#272b36] bg-[#1a1e27] hover:border-purple-500/50"
                    } ${
                      !isSelected && selectedModels.length >= 3
                        ? "cursor-not-allowed opacity-40"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {model.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          {model.provider.name}
                        </p>
                      </div>

                      <span className="text-purple-400">
                        {isSelected ? "✓" : "+"}
                      </span>
                    </div>
                  </button>
                );
              })}

            </div>
          )}

          <p className="mt-4 text-xs text-gray-500">
            Select up to 3 models to compare.
          </p>

        </div>

        {/* Comparison Results */}
        {comparisonModels.length === 0 ? (
          <div className="rounded-2xl border border-[#272b36] bg-[#12151c] py-20 text-center">
            <h2 className="text-xl font-semibold">
              Select models to compare
            </h2>

            <p className="mt-2 text-gray-400">
              Choose at least two models above to see their comparison.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#272b36] bg-[#12151c]">

            <table className="w-full min-w-[600px] border-collapse text-left">

              <thead>
                <tr className="border-b border-[#272b36]">
                  <th className="p-5 text-sm text-gray-400">
                    Specification
                  </th>

                  {comparisonModels.map((model) => (
                    <th
                      key={model.id}
                      className="p-5 text-lg font-semibold"
                    >
                      {model.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {/* Provider */}
                <tr className="border-b border-[#272b36]">
                  <td className="p-5 text-gray-400">
                    Provider
                  </td>

                  {comparisonModels.map((model) => (
                    <td key={model.id} className="p-5">
                      {model.provider.name}
                    </td>
                  ))}
                </tr>

                {/* Model Type */}
                <tr className="border-b border-[#272b36]">
                  <td className="p-5 text-gray-400">
                    Model Type
                  </td>

                  {comparisonModels.map((model) => (
                    <td key={model.id} className="p-5">
                      {model.modelType}
                    </td>
                  ))}
                </tr>

                {/* Context Window */}
                <tr className="border-b border-[#272b36]">
                  <td className="p-5 text-gray-400">
                    Context Window
                  </td>

                  {comparisonModels.map((model) => (
                    <td key={model.id} className="p-5 font-medium">
                      {model.contextWindow.toLocaleString()} tokens
                    </td>
                  ))}
                </tr>

                {/* Input Pricing */}
                <tr className="border-b border-[#272b36]">
                  <td className="p-5 text-gray-400">
                    Input Price / 1M Tokens
                  </td>

                  {comparisonModels.map((model) => (
                    <td key={model.id} className="p-5">
                      ${Number(model.inputPrice).toFixed(4)}
                    </td>
                  ))}
                </tr>

                {/* Output Pricing */}
                <tr className="border-b border-[#272b36]">
                  <td className="p-5 text-gray-400">
                    Output Price / 1M Tokens
                  </td>

                  {comparisonModels.map((model) => (
                    <td key={model.id} className="p-5">
                      ${Number(model.outputPrice).toFixed(4)}
                    </td>
                  ))}
                </tr>

                {/* Modalities */}
                <tr className="border-b border-[#272b36]">
                  <td className="p-5 text-gray-400">
                    Modalities
                  </td>

                  {comparisonModels.map((model) => (
                    <td key={model.id} className="p-5">
                      {model.modalities.join(", ")}
                    </td>
                  ))}
                </tr>

                {/* Capabilities */}
                <tr>
                  <td className="p-5 text-gray-400">
                    Capabilities
                  </td>

                  {comparisonModels.map((model) => (
                    <td key={model.id} className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {model.capabilities.map((capability) => (
                          <span
                            key={capability}
                            className="rounded-md bg-[#1a1e27] px-2 py-1 text-xs text-gray-300"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Benchmark Scores */}
{["MMLU", "HumanEval", "GPQA", "AIME", "SWE-Bench"].map(
  (benchmarkName) => (
    <tr
      key={benchmarkName}
      className="border-b border-[#272b36]"
    >
      <td className="p-5 text-gray-400">
        {benchmarkName}
      </td>

      {comparisonModels.map((model) => {
        const benchmark = model.benchmarks.find(
          (item) => item.benchmark.name === benchmarkName
        );

        return (
          <td key={model.id} className="p-5 font-medium">
            {benchmark
              ? Number(benchmark.score).toFixed(1) + "/100"
              : "—"}
          </td>
        );
      })}
    </tr>
  )
)}

              </tbody>

            </table>

          </div>
        )}

      </section>

    </main>
  );
}