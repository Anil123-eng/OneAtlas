import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding OneAtlas database...");

  // AI Providers
  const providers = [
    {
      name: "OpenAI",
      slug: "openai",
      description: "AI research and deployment company",
      website: "https://openai.com",
    },
    {
      name: "Anthropic",
      slug: "anthropic",
      description: "AI safety and research company",
      website: "https://anthropic.com",
    },
    {
      name: "Google",
      slug: "google",
      description: "AI models and technology",
      website: "https://ai.google",
    },
    {
      name: "Meta",
      slug: "meta",
      description: "Open-source AI models",
      website: "https://ai.meta.com",
    },
    {
      name: "DeepSeek",
      slug: "deepseek",
      description: "Advanced AI models and reasoning",
      website: "https://deepseek.com",
    },
    {
      name: "xAI",
      slug: "xai",
      description: "Artificial intelligence company",
      website: "https://x.ai",
    },
    {
      name: "Mistral AI",
      slug: "mistral",
      description: "Open and commercial AI models",
      website: "https://mistral.ai",
    },
  ];

  for (const provider of providers) {
    await prisma.provider.upsert({
      where: { slug: provider.slug },
      update: provider,
      create: provider,
    });
  }

  // AI Models
  const models = [
    {
      name: "GPT-4.1",
      slug: "gpt-4-1",
      provider: "openai",
      description: "Advanced model for coding, reasoning and complex tasks.",
      modelType: "LLM",
      contextWindow: 1000000,
      inputPrice: 2,
      outputPrice: 8,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "coding", "vision", "function-calling"],
      releaseDate: new Date("2025-04-14"),
    },
    {
      name: "GPT-4.1 Mini",
      slug: "gpt-4-1-mini",
      provider: "openai",
      description: "Efficient and affordable model for everyday applications.",
      modelType: "LLM",
      contextWindow: 1000000,
      inputPrice: 0.4,
      outputPrice: 1.6,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "coding", "vision"],
      releaseDate: new Date("2025-04-14"),
    },
    {
      name: "GPT-4.1 Nano",
      slug: "gpt-4-1-nano",
      provider: "openai",
      description: "Small and fast model optimized for low-cost tasks.",
      modelType: "LLM",
      contextWindow: 1000000,
      inputPrice: 0.1,
      outputPrice: 0.4,
      modalities: ["text", "image"],
      capabilities: ["classification", "summarization"],
      releaseDate: new Date("2025-04-14"),
    },
    {
      name: "o3",
      slug: "o3",
      provider: "openai",
      description: "Advanced reasoning model for complex problems.",
      modelType: "Reasoning",
      contextWindow: 200000,
      inputPrice: 2,
      outputPrice: 8,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "coding", "math", "vision"],
      releaseDate: new Date("2025-04-16"),
    },
    {
      name: "Claude Sonnet 4",
      slug: "claude-sonnet-4",
      provider: "anthropic",
      description: "Balanced intelligence for coding and complex workflows.",
      modelType: "LLM",
      contextWindow: 200000,
      inputPrice: 3,
      outputPrice: 15,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "coding", "vision", "agents"],
      releaseDate: new Date("2025-05-22"),
    },
    {
      name: "Claude Opus 4",
      slug: "claude-opus-4",
      provider: "anthropic",
      description: "High-performance model for advanced coding and reasoning.",
      modelType: "LLM",
      contextWindow: 200000,
      inputPrice: 15,
      outputPrice: 75,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "coding", "agents"],
      releaseDate: new Date("2025-05-22"),
    },
    {
      name: "Claude 3.5 Haiku",
      slug: "claude-3-5-haiku",
      provider: "anthropic",
      description: "Fast model for responsive AI applications.",
      modelType: "LLM",
      contextWindow: 200000,
      inputPrice: 0.8,
      outputPrice: 4,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "classification", "coding"],
      releaseDate: new Date("2024-10-22"),
    },
    {
      name: "Gemini 2.5 Pro",
      slug: "gemini-2-5-pro",
      provider: "google",
      description: "Advanced multimodal model with long-context reasoning.",
      modelType: "Multimodal",
      contextWindow: 1000000,
      inputPrice: 1.25,
      outputPrice: 10,
      modalities: ["text", "image", "audio", "video"],
      capabilities: ["reasoning", "coding", "vision", "long-context"],
      releaseDate: new Date("2025-03-25"),
    },
    {
      name: "Gemini 2.5 Flash",
      slug: "gemini-2-5-flash",
      provider: "google",
      description: "Fast and cost-efficient multimodal AI model.",
      modelType: "Multimodal",
      contextWindow: 1000000,
      inputPrice: 0.3,
      outputPrice: 2.5,
      modalities: ["text", "image", "audio", "video"],
      capabilities: ["reasoning", "coding", "vision"],
      releaseDate: new Date("2025-04-17"),
    },
    {
      name: "Gemini 2.0 Flash",
      slug: "gemini-2-0-flash",
      provider: "google",
      description: "Efficient model designed for fast AI applications.",
      modelType: "Multimodal",
      contextWindow: 1000000,
      inputPrice: 0.1,
      outputPrice: 0.4,
      modalities: ["text", "image", "audio", "video"],
      capabilities: ["reasoning", "vision", "function-calling"],
      releaseDate: new Date("2024-12-11"),
    },
    {
      name: "Llama 4 Maverick",
      slug: "llama-4-maverick",
      provider: "meta",
      description: "Open-weight multimodal model for general AI tasks.",
      modelType: "LLM",
      contextWindow: 1000000,
      inputPrice: 0.2,
      outputPrice: 0.6,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "coding", "vision"],
      releaseDate: new Date("2025-04-05"),
    },
    {
      name: "Llama 4 Scout",
      slug: "llama-4-scout",
      provider: "meta",
      description: "Efficient model with extended context capabilities.",
      modelType: "LLM",
      contextWindow: 10000000,
      inputPrice: 0.15,
      outputPrice: 0.4,
      modalities: ["text", "image"],
      capabilities: ["reasoning", "vision", "long-context"],
      releaseDate: new Date("2025-04-05"),
    },
    {
      name: "DeepSeek R1",
      slug: "deepseek-r1",
      provider: "deepseek",
      description: "Reasoning model for mathematics and complex problem-solving.",
      modelType: "Reasoning",
      contextWindow: 128000,
      inputPrice: 0.55,
      outputPrice: 2.19,
      modalities: ["text"],
      capabilities: ["reasoning", "coding", "math"],
      releaseDate: new Date("2025-01-20"),
    },
    {
      name: "DeepSeek V3",
      slug: "deepseek-v3",
      provider: "deepseek",
      description: "General-purpose model with strong coding performance.",
      modelType: "LLM",
      contextWindow: 128000,
      inputPrice: 0.27,
      outputPrice: 1.1,
      modalities: ["text"],
      capabilities: ["reasoning", "coding", "chat"],
      releaseDate: new Date("2024-12-26"),
    },
    {
      name: "Grok 3",
      slug: "grok-3",
      provider: "xai",
      description: "Advanced reasoning and knowledge model.",
      modelType: "Reasoning",
      contextWindow: 131072,
      inputPrice: 3,
      outputPrice: 15,
      modalities: ["text"],
      capabilities: ["reasoning", "coding", "math"],
      releaseDate: new Date("2025-02-17"),
    },
    {
      name: "Grok 3 Mini",
      slug: "grok-3-mini",
      provider: "xai",
      description: "Lightweight reasoning model optimized for speed.",
      modelType: "Reasoning",
      contextWindow: 131072,
      inputPrice: 0.3,
      outputPrice: 0.5,
      modalities: ["text"],
      capabilities: ["reasoning", "coding", "math"],
      releaseDate: new Date("2025-02-17"),
    },
    {
      name: "Mistral Large",
      slug: "mistral-large",
      provider: "mistral",
      description: "High-performance multilingual AI model.",
      modelType: "LLM",
      contextWindow: 128000,
      inputPrice: 2,
      outputPrice: 6,
      modalities: ["text"],
      capabilities: ["reasoning", "coding", "multilingual"],
      releaseDate: new Date("2024-11-18"),
    },
    {
      name: "Codestral",
      slug: "codestral",
      provider: "mistral",
      description: "Specialized model for code generation and completion.",
      modelType: "Code",
      contextWindow: 256000,
      inputPrice: 0.3,
      outputPrice: 0.9,
      modalities: ["text"],
      capabilities: ["coding", "code-completion", "reasoning"],
      releaseDate: new Date("2025-05-13"),
    },
  ];

  for (const model of models) {
    const provider = await prisma.provider.findUnique({
      where: { slug: model.provider },
    });

    if (!provider) {
      throw new Error(`Provider not found: ${model.provider}`);
    }

    const { provider: providerSlug, ...modelData } = model;

    await prisma.aIModel.upsert({
      where: { slug: model.slug },
      update: {
        ...modelData,
        providerId: provider.id,
      },
      create: {
        ...modelData,
        providerId: provider.id,
      },
    });
  }

  // Benchmarks
  const benchmarks = [
    {
      name: "MMLU",
      slug: "mmlu",
      category: "Knowledge",
      description: "Multitask language understanding benchmark.",
    },
    {
      name: "HumanEval",
      slug: "humaneval",
      category: "Coding",
      description: "Programming problem-solving benchmark.",
    },
    {
      name: "GPQA",
      slug: "gpqa",
      category: "Reasoning",
      description: "Graduate-level scientific reasoning benchmark.",
    },
    {
      name: "AIME",
      slug: "aime",
      category: "Mathematics",
      description: "Mathematical reasoning benchmark.",
    },
    {
      name: "SWE-Bench",
      slug: "swe-bench",
      category: "Coding",
      description: "Real-world software engineering benchmark.",
    },
  ];

  for (const benchmark of benchmarks) {
    await prisma.benchmark.upsert({
      where: { slug: benchmark.slug },
      update: benchmark,
      create: benchmark,
    });
  }

    // Benchmark Scores (Illustrative Demo Data)
  const benchmarkScores = [
    { model: "gpt-4-1", benchmark: "mmlu", score: 92.4 },
    { model: "gpt-4-1", benchmark: "humaneval", score: 87.5 },
    { model: "gpt-4-1", benchmark: "gpqa", score: 72.8 },
    { model: "gpt-4-1", benchmark: "aime", score: 45.0 },
    { model: "gpt-4-1", benchmark: "swe-bench", score: 54.6 },

    { model: "claude-sonnet-4", benchmark: "mmlu", score: 90.2 },
    { model: "claude-sonnet-4", benchmark: "humaneval", score: 92.0 },
    { model: "claude-sonnet-4", benchmark: "gpqa", score: 75.4 },
    { model: "claude-sonnet-4", benchmark: "aime", score: 55.0 },
    { model: "claude-sonnet-4", benchmark: "swe-bench", score: 72.7 },

    { model: "gemini-2-5-pro", benchmark: "mmlu", score: 89.8 },
    { model: "gemini-2-5-pro", benchmark: "humaneval", score: 84.1 },
    { model: "gemini-2-5-pro", benchmark: "gpqa", score: 74.2 },
    { model: "gemini-2-5-pro", benchmark: "aime", score: 49.0 },
    { model: "gemini-2-5-pro", benchmark: "swe-bench", score: 63.2 },

    { model: "deepseek-r1", benchmark: "mmlu", score: 90.8 },
    { model: "deepseek-r1", benchmark: "humaneval", score: 82.6 },
    { model: "deepseek-r1", benchmark: "gpqa", score: 71.5 },
    { model: "deepseek-r1", benchmark: "aime", score: 79.8 },

    { model: "o3", benchmark: "mmlu", score: 91.5 },
    { model: "o3", benchmark: "humaneval", score: 88.0 },
    { model: "o3", benchmark: "gpqa", score: 78.3 },
    { model: "o3", benchmark: "aime", score: 86.7 },
    { model: "o3", benchmark: "swe-bench", score: 69.1 },

    { model: "grok-3", benchmark: "mmlu", score: 88.5 },
    { model: "grok-3", benchmark: "humaneval", score: 79.0 },
    { model: "grok-3", benchmark: "gpqa", score: 70.2 },
    { model: "grok-3", benchmark: "aime", score: 77.3 },

    { model: "mistral-large", benchmark: "mmlu", score: 84.5 },
    { model: "codestral", benchmark: "humaneval", score: 91.0 },
    { model: "codestral", benchmark: "swe-bench", score: 45.2 },

    { model: "llama-4-maverick", benchmark: "mmlu", score: 85.2 },
    { model: "llama-4-maverick", benchmark: "humaneval", score: 78.5 },
    { model: "llama-4-maverick", benchmark: "gpqa", score: 65.3 },
  ];

  for (const result of benchmarkScores) {
    const model = await prisma.aIModel.findUnique({
      where: { slug: result.model },
    });

    const benchmark = await prisma.benchmark.findUnique({
      where: { slug: result.benchmark },
    });

    if (!model || !benchmark) {
      throw new Error(
        `Missing model or benchmark: ${result.model} / ${result.benchmark}`
      );
    }

    await prisma.modelBenchmark.upsert({
      where: {
        modelId_benchmarkId: {
          modelId: model.id,
          benchmarkId: benchmark.id,
        },
      },
      update: {
        score: result.score,
      },
      create: {
        id: `${result.model}-${result.benchmark}`,
        modelId: model.id,
        benchmarkId: benchmark.id,
        score: result.score,
      },
    });
  }

  console.log(`Benchmark scores created: ${benchmarkScores.length}`);

  console.log("Providers created: 7");
  console.log("Models created: 18");
  console.log("Benchmarks created: 5");
  console.log("Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });