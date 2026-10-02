import { DraftMark } from "@/components/DraftMark";
import { Section } from "@/components/Section";
import { drafts } from "@/content/site";

export function ClinicalWork() {
  return (
    <Section id="work" labelledBy="work-heading">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
        Work
      </p>
      <h2
        id="work-heading"
        className="mt-6 max-w-[10em] font-serif text-[clamp(2.35rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-ink text-balance"
      >
        What brings you here?
      </h2>
      <p className="mt-8 max-w-[42ch] text-base leading-relaxed text-ink">
        {drafts.workDisclaimer}
      </p>

      <ol className="mt-12 border-b border-ink/15">
        {drafts.focusAreas.map((area, index) => (
          <li
            key={area.id}
            tabIndex={0}
            className="group relative border-t border-ink/15 transition-colors hover:bg-olive/80 focus-visible:bg-olive"
          >
            <span
              className="absolute bottom-0 left-0 top-0 w-px origin-top scale-y-0 bg-terracotta transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
              aria-hidden="true"
            />
            <div className="grid gap-4 px-1 py-8 sm:px-4 md:grid-cols-12 md:gap-8 md:py-10">
              <p className="font-serif text-4xl leading-none tracking-[-0.04em] text-terracotta md:col-span-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="md:col-span-9 md:col-start-4">
                {area.status === "draft" ? <DraftMark>Draft</DraftMark> : null}
                <h3 className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-tight tracking-[-0.02em] text-ink">
                  {area.area}
                </h3>
                <p className="mt-4 max-w-[46ch] font-serif text-lg leading-snug tracking-[-0.02em] text-ink-soft">
                  {area.audience}
                </p>
                <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink-soft">
                  {area.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
