export function DraftMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink-soft">
      <span className="h-1.5 w-1.5 bg-terracotta" aria-hidden="true" />
      {children}
    </span>
  );
}
