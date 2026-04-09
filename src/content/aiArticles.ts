export type AiArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type AiArticle = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  sections: AiArticleSection[];
};

export const aiArticles: AiArticle[] = [
  {
    slug: "silicons-what-are-they",
    title: "Silicons - What are they? and how to understand them?",
    publishedAt: "2026-04-07",
    summary:
      "A plain-language look at silicon, semiconductors, and chips—and why they matter when you read about AI hardware.",
    sections: [
      {
        heading: "What people usually mean",
        paragraphs: [
          "In everyday tech talk, “silicons” often loosely means the same thing as silicon chips: the patterned slices of semiconductor material inside processors, memory, and accelerators. Chemically, silicon is a single element (symbol Si). It is not the same as silicone, the flexible polymer used in seals and kitchen tools.",
          "When headlines mention “silicon” or “new silicon,” they are usually pointing at chip design, manufacturing, or the supply chain—not a mysterious second kind of atom.",
        ],
      },
      {
        heading: "Why silicon dominates computing",
        paragraphs: [
          "Silicon can be grown into near-perfect crystals and then precisely doped with tiny amounts of other elements. That lets engineers build transistors: switches that turn current on or off. Pack billions of them together and you get CPUs, GPUs, and the dedicated circuits used for AI inference and training.",
          "Other materials compete in niche roles, but silicon’s combination of physics, decades of process refinement, and massive fabrication scale keeps it at the center of digital hardware.",
        ],
      },
      {
        heading: "How to read the story without drowning in jargon",
        paragraphs: [
          "Process node names (e.g., “3 nm,” “5 nm”) are marketing-led labels more than literal ruler measurements. They still signal a direction: newer generations generally pack more transistors per area and aim for better energy efficiency—both important for large AI workloads.",
          "When you see “GPU,” “TPU,” or “AI accelerator,” think: specialized silicon arranged to multiply matrices and move data in parallel. The model may live in software, but cost, speed, and power draw are often decided by what the silicon can sustain.",
          "If a claim sounds absolute (“this chip solves AI”), look for benchmarks on real models, batch sizes, and power budgets. Silicon advances are real, but they show up as incremental improvements layered across architecture, software, and manufacturing.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): AiArticle | undefined {
  return aiArticles.find((a) => a.slug === slug);
}
