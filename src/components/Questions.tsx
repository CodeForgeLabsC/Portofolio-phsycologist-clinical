"use client";

import { useId, useState } from "react";
import { DraftMark } from "@/components/DraftMark";
import { Section } from "@/components/Section";
import type { Question } from "@/content/site";
import { drafts } from "@/content/site";

function QuestionItem({ item }: { item: Question }) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-t border-ink/15">
      <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight tracking-[-0.02em]">
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-start justify-between gap-6 py-6 text-left text-ink"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{item.question}</span>
          <span className="relative mt-2 h-3 w-3 shrink-0" aria-hidden="true">
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
            <span
              className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink ${open ? "scale-y-0" : ""}`}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="max-w-[58ch] pb-6 pr-8"
      >
        {item.placeholder ? (
          <p className="mb-3">
            <DraftMark>Placeholder</DraftMark>
          </p>
        ) : null}
        <p className="text-base leading-relaxed text-ink">{item.answer}</p>
      </div>
    </div>
  );
}

export function Questions() {
  return (
    <Section id="questions" labelledBy="questions-heading">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
            Questions
          </p>
          <h2
            id="questions-heading"
            className="mt-6 font-serif text-[clamp(2.4rem,6.4vw,4.2rem)] leading-[1.02] tracking-[-0.03em] text-ink"
          >
            Before you write.
          </h2>
        </div>
        <div className="border-b border-ink/15 lg:col-span-7 lg:col-start-6">
          {drafts.questions.map((item) => (
            <QuestionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
