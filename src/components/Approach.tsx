import { DraftMark } from "@/components/DraftMark";
import { Section } from "@/components/Section";
import { drafts } from "@/content/site";

export function Approach() {
  const { approach } = drafts;

  return (
    <div className="bg-olive">
      <Section id="approach" labelledBy="approach-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
              Approach
            </p>
            <h2
              id="approach-heading"
              className="mt-6 font-serif text-[clamp(2.4rem,6.4vw,4.4rem)] leading-[1.02] tracking-[-0.03em] text-ink"
            >
              How a week with me actually goes.
            </h2>
            <p className="mt-8 max-w-[34ch] text-base leading-relaxed text-ink">
              {approach.reviewed ? null : (
                <span className="mb-3 block">
                  <DraftMark>For review</DraftMark>
                </span>
              )}
              {approach.note}
            </p>
          </div>

          <ol className="lg:col-span-7">
            {approach.steps.map((step, index) => (
              <li
                key={step.id}
                className="grid gap-3 border-t border-ink/20 py-8 sm:grid-cols-12 sm:gap-6"
              >
                <p className="font-serif text-2xl leading-none tracking-[-0.03em] text-terracotta sm:col-span-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-[clamp(1.55rem,2.4vw,2rem)] leading-tight tracking-[-0.02em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-ink">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  );
}
