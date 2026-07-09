import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const localArticles = [
  {
    id: "buyer-agent-guide",
    service: "buyer-advisory",
    category: "Buyer Advisory",
    title: "What Does a Buyer Agent Actually Do?",
    slug: "what-does-a-buyer-agent-actually-do",
    status: "published",
    publish_date: "2026-07-09",
    excerpt:
      "A practical guide to how buyer agents help with search, due diligence, negotiation and settlement.",
    content:
      "A buyer agent helps purchasers make better property decisions by managing the search, assessing risks, reviewing comparable sales, coordinating due diligence and negotiating on behalf of the buyer.",
  },
  {
    id: "property-management-guide",
    service: "property-management",
    category: "Property Management",
    title: "How to Choose the Right Property Manager",
    slug: "how-to-choose-the-right-property-manager",
    status: "published",
    publish_date: "2026-07-09",
    excerpt:
      "Key things landlords should consider before appointing a property manager.",
    content:
      "A strong property manager protects your investment by managing tenant selection, compliance, maintenance, communication and rent performance.",
  },
  {
    id: "conveyancing-guide",
    service: "conveyancing",
    category: "Conveyancing",
    title: "What Buyers Should Check Before Signing a Contract",
    slug: "what-buyers-should-check-before-signing-a-contract",
    status: "published",
    publish_date: "2026-07-09",
    excerpt:
      "Important contract and Section 32 checks before committing to a property purchase.",
    content:
      "Before signing a contract, buyers should understand the title, planning, owners corporation details, special conditions, settlement terms and any legal risks.",
  },
  {
    id: "mortgage-finance-guide",
    service: "mortgage-finance",
    category: "Mortgage & Finance",
    title: "Finance Preparation Before Buying Property",
    slug: "finance-preparation-before-buying-property",
    status: "published",
    publish_date: "2026-07-09",
    excerpt:
      "Why finance preparation matters before searching, negotiating or making an offer.",
    content:
      "Finance preparation helps buyers understand borrowing capacity, deposit requirements, repayments, loan structure and approval conditions before making property decisions.",
  },
];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(localArticles.map((article) => article.category))];
  }, []);

  const publishedArticles = useMemo(() => {
    return localArticles
      .filter((article) => article.status === "published")
      .filter((article) => {
        if (selectedCategory === "All") return true;
        return article.category === selectedCategory;
      })
      .sort(
        (a, b) =>
          new Date(b.publish_date).getTime() -
          new Date(a.publish_date).getTime()
      );
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-[#173F35] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
            Knowledge Centre
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Practical property guidance for buyers, landlords and homeowners.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-100">
            Explore helpful guides across buyer advisory, property management,
            conveyancing and mortgage preparation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-[#173F35] bg-[#173F35] text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:border-[#173F35]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {publishedArticles.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-semibold text-stone-900">
              No articles found
            </h2>
            <p className="mt-3 text-stone-600">
              Articles will appear here once they are published.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedArticles.map((article) => (
              <article
                key={article.id}
                className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-[#173F35]">
                  {article.category}
                </p>

                <h2 className="mt-4 text-2xl font-semibold leading-tight text-stone-950">
                  {article.title}
                </h2>

                <p className="mt-4 flex-1 leading-7 text-stone-600">
                  {article.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-stone-500">
                    {new Date(article.publish_date).toLocaleDateString(
                      "en-AU",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>

                  <Link
                    to={`/articles/${article.slug}`}
                    className="text-sm font-semibold text-[#173F35] hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}