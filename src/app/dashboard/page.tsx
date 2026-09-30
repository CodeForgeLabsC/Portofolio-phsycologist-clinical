import type { Metadata } from "next";
import Image from "next/image";
import { DoorwayFrame } from "@/components/Doorway";
import { login, logout } from "@/app/dashboard/actions";
import { profile, verified } from "@/content/site";
import { dashboardConfigured, isDashboardAuthed } from "@/lib/dashboard-auth";
import { listInquiries } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inquiries — Richia Martinez",
  robots: { index: false, follow: false },
};

const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const authed = await isDashboardAuthed();
  const inquiries = authed ? await listInquiries() : [];

  return (
    <main className="mx-auto min-h-full w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
        <a href="/" className="font-serif text-xl tracking-[-0.02em] text-ink">
          {profile.name}
        </a>
        {authed ? (
          <form action={logout}>
            <button
              type="submit"
              className="min-h-11 border border-ink/20 px-4 text-sm text-ink"
            >
              Log out
            </button>
          </form>
        ) : (
          <a href="/#contact" className="text-sm text-ink underline decoration-terracotta underline-offset-4">
            Contact
          </a>
        )}
      </div>

      <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {verified.portrait ? (
            <div className="flex max-w-[220px] items-stretch gap-3">
              <span className="w-1.5 shrink-0 bg-terracotta" aria-hidden="true" />
              <DoorwayFrame photo>
                <Image
                  src={verified.portrait.src}
                  alt={verified.portrait.alt}
                  fill
                  sizes="220px"
                  className="object-cover object-[center_18%]"
                />
              </DoorwayFrame>
            </div>
          ) : null}
        </div>
        <div className="lg:col-span-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
            Inquiry desk
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.03em] text-ink">
            Notes sent to you.
          </h1>
          <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-ink-soft">
            Each inquiry is kept here
            {verified.email ? (
              <>
                {" "}
                and a copy is sent to {verified.email}
              </>
            ) : null}
            .
          </p>
        </div>
      </div>

      {!dashboardConfigured() ? (
        <p className="mt-12 max-w-[46ch] border border-ink/15 bg-olive px-4 py-3 text-sm leading-relaxed text-ink">
          Set DASHBOARD_PASSWORD before opening this desk.
        </p>
      ) : null}

      {dashboardConfigured() && !authed ? (
        <form action={login} className="mt-12 max-w-md bg-olive px-5 py-8 sm:px-8">
          <label htmlFor="password" className="text-sm text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-base text-ink"
          />
          {params.error ? (
            <p className="mt-3 text-sm text-ink" role="alert">
              That password did not match.
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-8 inline-flex min-h-12 items-center bg-ink px-5 text-base text-ivory"
          >
            Open inquiries
          </button>
        </form>
      ) : null}

      {authed ? (
        <section className="mt-14" aria-labelledby="inquiry-list-heading">
          <h2 id="inquiry-list-heading" className="sr-only">
            Received inquiries
          </h2>
          {inquiries.length === 0 ? (
            <p className="border-t border-ink/15 py-8 text-base text-ink-soft">
              No inquiries yet.
            </p>
          ) : (
            <ol className="border-b border-ink/15">
              {inquiries.map((inquiry) => (
                <li key={inquiry.id} className="grid gap-3 border-t border-ink/15 py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="text-sm text-ink-soft">
                      <time dateTime={inquiry.createdAt}>
                        {dateFormat.format(new Date(inquiry.createdAt))}
                      </time>
                    </p>
                    <p className="mt-3 text-sm text-ink">
                      {inquiry.emailed ? "Copied to email" : "Kept here only"}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-2xl tracking-[-0.02em] text-ink">
                      {inquiry.name}
                    </h3>
                    <p className="mt-1 text-sm">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="text-ink underline decoration-terracotta underline-offset-4"
                      >
                        {inquiry.email}
                      </a>
                    </p>
                    <p className="mt-4 max-w-[62ch] whitespace-pre-wrap text-base leading-relaxed text-ink">
                      {inquiry.message || "No message was included."}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      ) : null}
    </main>
  );
}
