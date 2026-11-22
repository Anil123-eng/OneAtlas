import db from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0d12] p-10 text-white">
          Loading model details...
        </div>
      }
    >
      <ModelDetails params={params} />
    </Suspense>
  );
}

async function ModelDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const model = await db.aIModel.findUnique({
    where: {
      slug,
    },
    include: {
      provider: true,
      benchmarks: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  if (!model) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <a
          href="/models"
          className="mb-8 inline-block text-sm text-gray-400 hover:text-white"
        >
          ← Back to Models
        </a>

        <div className="mb-8 rounded-2xl border border-[#272b36] bg-[#12151c] p-8">

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-xl font-bold">
              {model.provider.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm text-gray-400">
                {model.provider.name}
              </p>

              <p className="text-xs text-purple-400">
                {model.modelType}
              </p>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold">
            {model.name}
          </h1>

          <p className="max-w-3xl leading-7 text-gray-400">
            {model.description}
          </p>

        </div>

        <h2 className="mb-4 text-xl font-semibold">
          Model Specifications
        </h2>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-5">
            <p className="mb-2 text-sm text-gray-400">
              Context Window
            </p>

            <p className="text-2xl font-bold">
              {model.contextWindow.toLocaleString()}
            </p>

            <p className="text-xs text-gray-500">
              Tokens
            </p>
          </div>

          <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-5">
            <p className="mb-2 text-sm text-gray-400">
              Input Price
            </p>

            <p className="text-2xl font-bold text-purple-400">
              ${Number(model.inputPrice).toFixed(4)}
            </p>

            <p className="text-xs text-gray-500">
              Per 1 million tokens
            </p>
          </div>

          <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-5">
            <p className="mb-2 text-sm text-gray-400">
              Output Price
            </p>

            <p className="text-2xl font-bold text-purple-400">
              ${Number(model.outputPrice).toFixed(4)}
            </p>

            <p className="text-xs text-gray-500">
              Per 1 million tokens
            </p>
          </div>

          <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-5">
            <p className="mb-2 text-sm text-gray-400">
              Model Type
            </p>

            <p className="text-2xl font-bold">
              {model.modelType}
            </p>
          </div>

        </div>

        <div className="mb-8 rounded-2xl border border-[#272b36] bg-[#12151c] p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Supported Modalities
          </h2>

          <div className="flex flex-wrap gap-3">
            {model.modalities.map((modality) => (
              <span
                key={modality}
                className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
              >
                {modality}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-[#272b36] bg-[#12151c] p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Capabilities
          </h2>

          <div className="flex flex-wrap gap-3">
            {model.capabilities.map((capability) => (
              <span
                key={capability}
                className="rounded-full border border-[#272b36] bg-[#1a1e27] px-4 py-2 text-sm text-gray-300"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-[#272b36] bg-[#12151c] p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Benchmark Performance
          </h2>

          {model.benchmarks.length > 0 ? (
            <div className="space-y-4">
              {model.benchmarks.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between rounded-lg bg-[#1a1e27] p-4"
                >
                  <div>
                    <p className="font-medium">
                      {result.benchmark.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {result.benchmark.category}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-purple-400">
                    {Number(result.score).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No benchmark data available.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-[#272b36] bg-[#12151c] p-6">
          <h2 className="mb-4 text-xl font-semibold">
            AI Provider
          </h2>

          <p className="mb-2 text-lg font-medium">
            {model.provider.name}
          </p>

          {model.provider.description && (
            <p className="mb-4 text-gray-400">
              {model.provider.description}
            </p>
          )}

          {model.provider.website && (
            <a
              href={model.provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Visit Provider Website →
            </a>
          )}
        </div>

      </div>
    </main>
  );
}