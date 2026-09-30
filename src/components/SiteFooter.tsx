import { navigation, profile, verified } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/15">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-16">
        <div className="lg:col-span-5">
          <p className="font-serif text-3xl tracking-[-0.03em] text-ink">{profile.name}</p>
          <p className="mt-2 text-sm text-ink-soft">{profile.role}</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-ink underline decoration-transparent underline-offset-4 hover:decoration-terracotta"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/dashboard"
                className="text-sm text-ink underline decoration-transparent underline-offset-4 hover:decoration-terracotta"
              >
                Inquiries
              </a>
            </li>
          </ul>
        </nav>
        <div className="lg:col-span-4">
          {verified.footerDetails.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-ink">
              {verified.footerDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
          {verified.email ? (
            <p className="mt-3 text-sm text-ink">
              <a
                href={`mailto:${verified.email}`}
                className="underline decoration-terracotta underline-offset-4 hover:decoration-ink"
              >
                {verified.email}
              </a>
            </p>
          ) : null}
          <p className="mt-6 max-w-[36ch] text-sm leading-relaxed text-ink-soft">
            General inquiries only. This page is not monitored for emergencies.
          </p>
        </div>
      </div>
    </footer>
  );
}
