import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";

export function LegalSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-stone/70 pt-8 first:border-t-0 first:pt-0"
    >
      <h2 className="font-heading text-2xl font-light leading-tight text-midnight md:text-3xl">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-[15px] leading-7 text-midnight/70 md:text-base">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ children }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-golden">
      {children}
    </ul>
  );
}

export function LegalNotice({ children }) {
  return (
    <div className="rounded-xl border border-golden/30 bg-golden/5 px-5 py-4 text-midnight">
      <div className="text-[15px] font-medium leading-7 md:text-base">
        {children}
      </div>
    </div>
  );
}

export default function LegalPage({
  label = "Legal",
  title,
  description,
  effective = "11 July 2026",
  updated = "11 July 2026",
  sections = [],
  children,
}) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    document.title = `${title} | Origin Property Concierge`;
  }, [title]);

  useEffect(() => {
    const updateReadingProgress = () => {
      const documentElement = document.documentElement;
      const scrollTop =
        window.scrollY || documentElement.scrollTop || document.body.scrollTop;
      const scrollableHeight =
        documentElement.scrollHeight - documentElement.clientHeight;

      if (scrollableHeight <= 0) {
        setReadingProgress(0);
        return;
      }

      const progress = Math.min(
        100,
        Math.max(0, (scrollTop / scrollableHeight) * 100)
      );

      setReadingProgress(progress);
    };

    updateReadingProgress();

    window.addEventListener("scroll", updateReadingProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateReadingProgress);

    return () => {
      window.removeEventListener("scroll", updateReadingProgress);
      window.removeEventListener("resize", updateReadingProgress);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-[72px] z-40 h-[2px] bg-golden transition-[width] duration-150"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      <header className="border-b border-stone/70 bg-white/45">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-golden">
            {label}
          </p>

          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-light leading-[1.04] text-midnight md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-midnight/65 md:text-lg">
            {description}
          </p>

          <div className="mt-6 flex flex-col gap-2 text-[11px] uppercase tracking-[0.16em] text-midnight/45 sm:flex-row sm:items-center sm:gap-5">
            <p>Effective date {effective}</p>

            <span
              className="hidden h-3 w-px bg-stone sm:block"
              aria-hidden="true"
            />

            <p>Last updated {updated}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-10 lg:py-16">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-golden">
            On this page
          </p>

          <nav
            className="mt-4 border-l border-stone pl-4"
            aria-label={`${title} sections`}
          >
            <ul className="space-y-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-sm leading-5 text-midnight/60 transition-colors hover:text-accent-navy"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 space-y-10 rounded-2xl border border-stone/70 bg-white/55 p-6 shadow-sm md:p-10 lg:p-12">
          {children}

          <section className="border-t border-stone/70 pt-8">
            <div className="rounded-2xl border border-stone/70 bg-parchment/60 p-6 md:p-8">
              <p className="font-heading text-2xl font-light text-midnight md:text-3xl">
                Questions about this page?
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-midnight/65 md:text-[15px]">
                Contact Origin Property Concierge if you have a question about
                this policy, how your information is handled, or how the terms
                apply to your use of the website.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <a
                  href="mailto:hello@originpropertyconcierge.com.au"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-navy transition-colors hover:text-golden"
                >
                  <Mail size={16} />
                  hello@originpropertyconcierge.com.au
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-navy transition-colors hover:text-golden"
                >
                  Contact us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}