import { ChevronDown } from "lucide-react";
import FaqGlyph from "@/components/home/FaqGlyph";
import FaqHashOpen from "@/components/home/FaqHashOpen";
import {
  FAQ_CATEGORIES,
  FAQ_DRAFT_LABEL,
  FAQ_LAST_CHECKED,
  formatFaqCheckedLabel,
  getVisibleFaqItems,
  type FaqItem,
} from "@/content/faq";

export default function FaqSection({ limit }: { limit?: number }) {
  const items = getVisibleFaqItems(limit);

  return (
    <section
      id="domande-frequenti"
      aria-labelledby="faq-titolo"
      className="wrap scroll-mt-24 py-16 sm:py-24"
    >
      <FaqHashOpen />
      <h2 id="faq-titolo" className="mb-3 max-w-3xl text-ghiaccio">
        Domande frequenti su revisioni e officina a Brindisi
      </h2>
      <p className="mb-8 text-sm text-acciaio sm:mb-10">{formatFaqCheckedLabel(FAQ_LAST_CHECKED)}</p>

      <div className="faq-tree max-w-3xl">
        {FAQ_CATEGORIES.map((category) => {
          const group = items.filter((item) => item.category === category.id);
          if (group.length === 0) return null;

          return (
            <details key={category.id} className="faq-branch faq-item scroll-mt-24">
              <summary className="faq-summary">
                <span className="faq-frame chamfer">
                  <FaqGlyph category={category.id} />
                </span>
                <h3 id={`faq-gruppo-${category.id}`} className="min-w-0 flex-1 text-ghiaccio">
                  {category.title}
                </h3>
                <ChevronDown className="faq-chevron size-5 shrink-0 text-acciaio" aria-hidden="true" />
              </summary>
              <div className="faq-leaves">
                {group.map((item) => (
                  <FaqDetails key={item.id} item={item} />
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function FaqDetails({ item }: { item: FaqItem }) {
  const isDraft = item.status === "draft";

  return (
    <details id={`faq-${item.id}`} className="faq-item scroll-mt-24 border-b border-acciaio/20">
      <summary className="faq-summary faq-leaf">
        <span className="flex min-w-0 flex-1 flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
          <span className="font-medium text-ghiaccio">{item.question}</span>
          {isDraft ? (
            <span className="text-sm font-medium text-bozza">{FAQ_DRAFT_LABEL}</span>
          ) : null}
        </span>
        <ChevronDown className="faq-chevron mt-0.5 size-5 shrink-0 text-acciaio" aria-hidden="true" />
      </summary>
      <div className="pb-4 sm:pr-8">
        <p className={`whitespace-pre-line ${isDraft ? "text-bozza" : "text-acciaio"}`}>{item.answer}</p>
        {item.link ? (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center text-azzurro underline decoration-azzurro/40 underline-offset-4 transition-colors duration-150 hover:decoration-azzurro"
          >
            {item.link.label}
            <span className="sr-only"> (si apre in una nuova scheda)</span>
          </a>
        ) : null}
      </div>
    </details>
  );
}
