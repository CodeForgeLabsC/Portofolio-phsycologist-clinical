import { Section } from "@/components/Section";
import { verified } from "@/content/site";

export function Writing() {
  if (verified.writing.length === 0) return null;

  return (
    <Section id="writing" labelledBy="writing-heading">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
        Writing
      </p>
      <h2
        id="writing-heading"
        className="mt-6 max-w-[14ch] font-serif text-[clamp(2.4rem,6.4vw,4.6rem)] leading-[1.02] tracking-[-0.03em] text-ink"
      >
        Writing and perspectives.
      </h2>
      <ul className="mt-12 border-b border-ink/15">
        {verified.writing.map((entry) => (
          <li
            key={entry.title}
            className="grid gap-3 border-t border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <p className="text-sm text-ink-soft md:col-span-3">{entry.context}</p>
            <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink md:col-span-7">
              {entry.href ? (
                <a
                  href={entry.href}
                  className="underline decoration-terracotta decoration-1 underline-offset-4 hover:decoration-ink"
                >
                  {entry.title}
                </a>
              ) : (
                entry.title
              )}
            </h3>
          </li>
        ))}
      </ul>
    </Section>
  );
}
