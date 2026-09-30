export function DoorwayFrame({
  children,
  photo = false,
}: {
  children: React.ReactNode;
  photo?: boolean;
}) {
  if (photo) {
    return (
      <div
        className="relative aspect-[3/4] w-full overflow-hidden border border-ink bg-olive"
        style={{
          borderRadius: "50% 50% 1.35rem 1.35rem / 24% 24% 1.35rem 1.35rem",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full">
      <div className="absolute inset-x-[12%] inset-y-[9%] flex flex-col">
        {children}
      </div>
      <svg
        viewBox="0 0 300 400"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full text-ink"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 386 V78 C16 30 72 16 150 16 C228 16 284 30 284 78 V386"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function DoorwayDivider() {
  return (
    <div
      className="mx-auto flex w-full max-w-6xl items-center gap-5 px-5 sm:px-8 lg:px-10"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-ink/15" />
      <svg
        width="16"
        height="26"
        viewBox="0 0 16 26"
        fill="none"
        className="shrink-0 text-terracotta"
      >
        <path
          d="M1 25 V6.5 Q1 1 8 1 Q15 1 15 6.5 V25"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="h-px flex-1 bg-ink/15" />
    </div>
  );
}
