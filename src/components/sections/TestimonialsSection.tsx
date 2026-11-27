import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import {
  VERIFIED_TESTIMONIALS,
  type VerifiedTestimonial,
} from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: VerifiedTestimonial;
}

/** Displays a single verified client testimonial card once approved feedback is added. */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col justify-between border border-rule bg-paper p-6">
      <div>
        <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
        <p className="mt-4 text-base leading-relaxed text-ink">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
      <div className="mt-6 border-t border-rule pt-4">
        <p className="font-display text-sm font-semibold text-ink">
          {testimonial.authorName}
        </p>
        <p className="mt-0.5 text-xs text-slate">
          {testimonial.businessName} · {testimonial.serviceCategory}
        </p>
      </div>
    </article>
  );
}

/** Renders verified client reviews or an honest, restrained placeholder slot when no reviews are supplied yet. */
export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-b border-rule bg-linen"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 border-b border-rule pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
                WG / 07 — Client Feedback
              </span>
              <h2
                id="testimonials-heading"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
              >
                Verified Client Voices
              </h2>
            </div>
            <span className="font-mono text-xs text-slate">
              Published only after genuine project completion
            </span>
          </div>
        </Reveal>

        {VERIFIED_TESTIMONIALS.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VERIFIED_TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-rule bg-paper/75 p-8 sm:p-10">
            <div className="max-w-2xl space-y-2">
              <p className="font-mono text-xs tracking-[0.08em] text-accent uppercase">
                Reserved Verified Feedback Slot
              </p>
              <p className="font-display text-xl font-semibold text-ink">
                Genuine reviews from Web Guru clients will appear here.
              </p>
              <p className="text-sm leading-relaxed text-slate">
                We intentionally avoid placeholder praise or fabricated quotes.
                Verified client testimonials can be added anytime in{" "}
                <code className="rounded bg-linen px-1.5 py-0.5 font-mono text-xs text-ink">
                  src/data/testimonials.ts
                </code>{" "}
                and will automatically populate this reusable grid.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
