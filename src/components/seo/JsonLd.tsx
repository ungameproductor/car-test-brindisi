import { buildFaqJsonLd, FAQ_ITEMS } from "@/content/faq";
import { buildAutoRepairJsonLd } from "@/content/site";

function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(buildFaqJsonLd(FAQ_ITEMS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(buildAutoRepairJsonLd()) }}
      />
    </>
  );
}
