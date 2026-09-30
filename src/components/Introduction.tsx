import { DraftMark } from "@/components/DraftMark";
import { Section } from "@/components/Section";
import { drafts } from "@/content/site";

export function Introduction() {
  const { biography } = drafts;

  return (
    <Section id="about" labelledBy="about-heading">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
        About
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2
          id="about-heading"
          className="font-serif text-[clamp(2.35rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-ink text-balance lg:col-span-8"
        >
          A person before a professional profile.
        </h2>
        <p className="lg:col-span-3 lg:col-start-10 lg:pt-3">
          {biography.supplied ? null : <DraftMark>{biography.annotation}</DraftMark>}
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <p className="font-serif text-[clamp(1.7rem,3vw,2.45rem)] leading-snug tracking-[-0.02em] text-ink lg:col-span-8">
          {biography.opening}
        </p>
        <div className="max-w-[42ch] space-y-5 text-base leading-relaxed text-ink lg:col-span-5 lg:col-start-7">
          {biography.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
