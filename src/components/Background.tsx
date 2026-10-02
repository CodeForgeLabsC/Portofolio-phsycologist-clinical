import { Section } from "@/components/Section";
import { verified } from "@/content/site";

export function Background() {
  if (verified.background.length === 0) return null;

  return (
    <Section id="background" labelledBy="background-heading">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
        Background
      </p>
      <h2
        id="background-heading"
        className="mt-6 max-w-[14ch] font-serif text-[clamp(2.4rem,6.4vw,4.6rem)] leading-[1.02] tracking-[-0.03em] text-ink"
      >
        What it is like to come.
      </h2>
      <ol className="mt-12 max-w-3xl border-l border-ink/20">
        {verified.background.map((entry) => (
          <li key={`${entry.period}-${entry.title}`} className="relative pb-10 pl-8">
            <span
              className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 bg-terracotta"
              aria-hidden="true"
            />
            <p className="text-sm text-ink-soft">{entry.period}</p>
            <h3 className="mt-1 font-serif text-2xl leading-tight tracking-[-0.02em] text-ink">
              {entry.title}
            </h3>
            {entry.detail ? (
              <p className="mt-2 max-w-[52ch] text-base leading-relaxed text-ink">
                {entry.detail}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
