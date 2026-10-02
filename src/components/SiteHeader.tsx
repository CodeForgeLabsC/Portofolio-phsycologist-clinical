"use client";

import { useEffect, useId, useRef, useState } from "react";
import { navigation, primaryAction, profile } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <a
          href="/#top"
          className="font-serif text-[1.15rem] leading-none tracking-[-0.02em] text-ink sm:text-[1.35rem]"
        >
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:decoration-terracotta"
            >
              {item.label}
            </a>
          ))}
          <a
            href={primaryAction.href}
            className="inline-flex min-h-11 items-center bg-ink px-4 text-sm text-ivory transition-colors hover:bg-[#3a4742]"
          >
            {primaryAction.label}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-ink/20 px-3 text-sm text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className="border-t border-ink/10 bg-ivory lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-6xl flex-col px-5 py-4 sm:px-8">
            <a
              href={primaryAction.href}
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center bg-ink px-4 text-sm text-ivory"
            >
              {primaryAction.label}
            </a>
            <ul className="mt-2">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-ink/10">
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex min-h-12 items-center font-serif text-2xl text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
