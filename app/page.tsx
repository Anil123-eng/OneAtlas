 
import db from "@/lib/prisma";
import ModelSearch from "@/app/components/ModelSearch";

export const instant = false;

export default async function Home() {
  const models = await db.aIModel.findMany({
    where: {
      slug: {
        in: ["gpt-4-1", "claude-sonnet-4", "gemini-2-5-pro"],
      },
    },
    include: {
      provider: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-[#272b36] px-6 py-5 md:px-12">
        <div className="text-2xl font-bold tracking-tight">
          One<span className="text-purple-500">Atlas</span>
          <span className="ml-1 text-sm text-gray-500">.dev</span>
        </div>

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
          <a href="/compare" className="hover:text-white">
            Compare
          </a>
        </div>

        <a
          href="/models"
          className="rounded-lg border border-[#333744] px-4 py-2 text-sm hover:bg-[#1a1e27]"
        >
          Explore Models
        </a>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 text-center md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
            AI Model Intelligence Platform
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Discover the right
            <br />
            <span className="text-purple-500">AI model for you.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Explore, compare, and evaluate AI models from leading
            providers. Find the perfect model for your next project.
          </p>

          {/* Search Bar */}
          <div className="mt-10">
            <ModelSearch />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Popular: GPT · Claude · Gemini · Llama · DeepSeek
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 pb-20 md:grid-cols-4 md:px-12">
        <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-6 text-center">
          <h2 className="text-3xl font-bold">500+</h2>
          <p className="mt-2 text-sm text-gray-500">AI Models</p>
        </div>

        <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-6 text-center">
          <h2 className="text-3xl font-bold">50+</h2>
          <p className="mt-2 text-sm text-gray-500">Providers</p>
        </div>

        <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-6 text-center">
          <h2 className="text-3xl font-bold">100+</h2>
          <p className="mt-2 text-sm text-gray-500">Benchmarks</p>
        </div>

        <div className="rounded-xl border border-[#272b36] bg-[#12151c] p-6 text-center">
          <h2 className="text-3xl font-bold">24/7</h2>
          <p className="mt-2 text-sm text-gray-500">Model Intelligence</p>
        </div>
      </section>

      {/* Featured Models */}
      <section
        id="models"
        className="mx-auto max-w-7xl px-6 pb-24 md:px-12"
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Models</h2>
            <p className="mt-2 text-sm text-gray-500">
              Explore some of the most popular AI models.
            </p>
          </div>

          <a
            href="/models"
            className="hidden rounded-lg border border-[#333744] px-4 py-2 text-sm hover:bg-[#1a1e27] sm:block"
          >
            View All Models →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <div
              key={model.id}
              className="rounded-xl border border-[#272b36] bg-[#12151c] p-6 transition hover:border-purple-500/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-xl font-bold text-purple-400">
                  {model.provider.name.charAt(0)}
                </div>

                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                  {model.modelType}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {model.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {model.provider.name}
              </p>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {model.description}
              </p>

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
                    ${model.inputPrice.toString()} / 1M tokens
                  </p>
                </div>
              </div>

              <a
                href={`/models/${model.slug}`}
                className="mt-5 block w-full rounded-lg border border-[#333744] py-2.5 text-center text-sm hover:bg-[#1a1e27]"
              >
                View Details →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
 