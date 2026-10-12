import type { FaqCategory } from "@/content/faq";

export default function FaqGlyph({ category }: { category: FaqCategory }) {
  if (category === "revisione") return <RulesGlyph />;
  if (category === "centro-servizi") return <WorkshopGlyph />;
  return <PlaceGlyph />;
}

function RulesGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
      <rect x="16" y="8" width="26" height="38" rx="3" fill="#0F151C" />
      <rect x="22" y="16" width="14" height="2.4" rx="1" fill="#F5F9FC" />
      <rect x="22" y="22" width="10" height="2.4" rx="1" fill="#F5F9FC" opacity="0.72" />
      <rect x="22" y="28" width="12" height="2.4" rx="1" fill="#F5F9FC" opacity="0.72" />
      <circle cx="40" cy="42" r="11" fill="#0F151C" />
      <path
        d="M34.5 42.2 38.2 46l7.3-8.2"
        fill="none"
        stroke="#F5F9FC"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkshopGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
      <path
        d="M8 38h6.5l3.2-9h18.6l3.2 9H56v7h-5.2a6.2 6.2 0 0 1-12.1 0H25.3a6.2 6.2 0 0 1-12.1 0H8v-7Z"
        fill="#0F151C"
      />
      <path d="M20.2 29h12.4l2.2 6.2H18l2.2-6.2Z" fill="#F5F9FC" opacity="0.9" />
      <circle cx="19.2" cy="45" r="3.1" fill="#42B4E8" />
      <circle cx="44.8" cy="45" r="3.1" fill="#42B4E8" />
      <path
        d="M46 14.5a6 6 0 0 0-5.2 7.8L36 27.2l3.6 3.6 4.9-4.8a6 6 0 0 0 7.8-5.2 6 6 0 0 1-6.3-6.3Z"
        fill="#0F151C"
      />
    </svg>
  );
}

function PlaceGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
      <path
        d="M32 8c-8.4 0-15 6.5-15 15.1C17 34.2 32 54 32 54s15-19.8 15-30.9C47 14.5 40.4 8 32 8Z"
        fill="#0F151C"
      />
      <circle cx="32" cy="23" r="5.5" fill="#42B4E8" />
      <path d="M14 58h36" stroke="#0F151C" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
