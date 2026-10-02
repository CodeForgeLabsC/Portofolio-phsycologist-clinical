import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { verified } from "@/content/site";

export function Contact() {
  const enabled = Boolean(verified.email);

  return (
    <Section id="contact" labelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-6 font-serif text-[clamp(2.4rem,6.4vw,4.4rem)] leading-[1.02] tracking-[-0.03em] text-ink"
          >
            Write when you are ready.
          </h2>
          <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-ink">
            A name, an email, and one honest sentence. I will tell you if I have
            room for a first conversation.
          </p>
          {verified.email ? (
            <p className="mt-6 text-base leading-relaxed text-ink">
              Or write directly to{" "}
              <a
                href={`mailto:${verified.email}`}
                className="underline decoration-terracotta underline-offset-4 hover:decoration-ink"
              >
                {verified.email}
              </a>
              .
            </p>
          ) : null}
          {verified.phone ? (
            <p className="mt-3 text-base leading-relaxed text-ink">
              Phone:{" "}
              <a
                href={`tel:${verified.phone}`}
                className="underline decoration-terracotta underline-offset-4 hover:decoration-ink"
              >
                {verified.phone}
              </a>
            </p>
          ) : null}
          <p className="mt-8 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
            This form is for general inquiries. It is not monitored for emergencies.
            If you or someone else is in immediate danger, contact your local
            emergency services.
          </p>
        </div>
        <div className="lg:col-span-7">
          <ContactForm enabled={enabled} />
        </div>
      </div>
    </Section>
  );
}
