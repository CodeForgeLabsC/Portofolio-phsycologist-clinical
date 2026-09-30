export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
