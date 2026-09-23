import type { Metadata } from "next";
import { getPublishedInsights } from "@/lib/queries";
import { InsightCard } from "@/components/InsightCard";
import { SectionHeader } from "@/components/SectionHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SUDMO Insights | Business, Technology & Growth Articles Kenya",
  description:
    "Read SUDMO Company Limited insights on business strategy, technology, finance and practical growth opportunities for organizations in Kenya and East Africa.",
  alternates: {
    canonical: "https://web-mfik-eight.vercel.app/insights",
  },
  openGraph: {
    title: "SUDMO Insights | Business, Technology & Growth Articles Kenya",
    description:
      "Read SUDMO Company Limited insights on business strategy, technology, finance and practical growth opportunities for organizations in Kenya and East Africa.",
    url: "https://web-mfik-eight.vercel.app/insights",
    type: "website",
  },
};

export default async function InsightsPage() {
  const insights = await getPublishedInsights();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Insights"
            title="Insights & ideas for leaders and decision makers."
            description="Explore articles that bring clarity to business, finance, technology and marketing in East Africa."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} title={insight.title} category={insight.category} excerpt={insight.excerpt} href={`/insights/${insight.slug}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
