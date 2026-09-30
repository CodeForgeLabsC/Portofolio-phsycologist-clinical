import { DoorwayFrame } from "@/components/Doorway";
import { primaryAction, profile, verified } from "@/content/site";
import Image from "next/image";

export function Hero() {
  return (
    <div className="mx-auto grid w-full max-w-6xl items-end gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-24 lg:pt-16">
      <div className="lg:col-span-7">
        <p className="rise text-[0.72rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-ink-soft">
          <span className="block sm:inline">{profile.name}</span>
          <span className="hidden px-2 text-terracotta sm:inline" aria-hidden="true">
            /
          </span>
          <span className="mt-1 block sm:mt-0 sm:inline">{profile.role}</span>
        </p>
        <h1 className="rise rise-delay-1 mt-6 max-w-[12em] font-serif text-[clamp(2.7rem,7.2vw,5.15rem)] leading-[0.94] tracking-[-0.035em] text-pretty text-ink">
          <span className="block">Room to think.</span>
          <span className="mt-1 block">Space to be yourself.</span>
        </h1>
        <p className="rise rise-delay-2 mt-8 max-w-[34ch] text-lg leading-relaxed text-ink sm:text-xl">
          You don’t need to have everything figured out before starting a
          conversation.
        </p>
        <div className="rise rise-delay-3 mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href={primaryAction.href}
            className="inline-flex min-h-12 items-center justify-center bg-ink px-5 text-base text-ivory transition-colors hover:bg-[#31424c]"
          >
            {primaryAction.label}
          </a>
          <a
            href="/#about"
            className="inline-flex min-h-12 items-center text-base text-ink underline decoration-terracotta decoration-1 underline-offset-[6px] hover:decoration-ink"
          >
            Meet Richia
          </a>
        </div>
      </div>

      <figure className="lg:col-span-5 lg:col-start-8">
        <div className="flex items-stretch gap-3 sm:gap-4">
          <span
            className="w-1.5 shrink-0 self-stretch bg-terracotta"
            aria-hidden="true"
          />
          <DoorwayFrame photo={Boolean(verified.portrait)}>
            {verified.portrait ? (
              <Image
                src={verified.portrait.src}
                alt={verified.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 32vw, 90vw"
                className="object-cover object-[center_20%]"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden bg-olive px-4 py-6 sm:px-6"
              >
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
                  {profile.role}
                </p>
                <p className="font-serif text-[clamp(5.5rem,18vw,8.5rem)] italic leading-[0.75] tracking-[-0.04em] text-ink">
                  R
                </p>
                <div>
                  <span className="mb-4 block h-px w-12 bg-terracotta" />
                  <p className="font-serif text-2xl leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
                    {profile.name}
                  </p>
                </div>
              </div>
            )}
          </DoorwayFrame>
        </div>
        <figcaption className="mt-4 text-sm leading-relaxed text-ink-soft">
          {verified.portrait ? profile.name : "A portrait will be placed here when one is supplied."}
        </figcaption>
      </figure>
    </div>
  );
}
