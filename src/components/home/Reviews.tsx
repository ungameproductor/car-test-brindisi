import { Star } from "lucide-react";
import { REVIEWS } from "@/content/site";

export default function Reviews() {
  return (
    <section id="recensioni" aria-labelledby="recensioni-titolo" className="wrap py-16 sm:py-24">
      <h2 id="recensioni-titolo" className="mb-8 max-w-3xl text-ghiaccio sm:mb-10">
        Cosa dicono i clienti
      </h2>
      <div className="grid max-w-3xl gap-4">
        {REVIEWS.map((review) => (
          <figure key={review.id} className="panel chamfer p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-sm font-medium text-azzurro">{review.source}</p>
              <p className="flex items-center gap-0.5 text-bozza" aria-label={`Valutazione: ${review.rating} stelle su 5`}>
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </p>
              <p className="text-sm text-acciaio">{review.when}</p>
            </div>
            <blockquote>
              <p className="text-lg leading-relaxed text-ghiaccio">{review.quote}</p>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
