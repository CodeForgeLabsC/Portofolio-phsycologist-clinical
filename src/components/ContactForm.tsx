"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { submitInquiry, type InquiryState } from "@/app/inquiry/actions";

const initialState: InquiryState = { status: "idle" };

const fieldClassName =
  "mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-base text-ink focus-visible:border-ink";

export function ContactForm({ enabled }: { enabled: boolean }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const nameErrorId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();
  const statusId = useId();

  useEffect(() => {
    if (state.status === "sent") {
      formRef.current?.reset();
    }
  }, [state]);

  const nameError = state.status === "invalid" ? state.fieldErrors?.name : undefined;
  const emailError = state.status === "invalid" ? state.fieldErrors?.email : undefined;
  const messageError = state.status === "invalid" ? state.fieldErrors?.message : undefined;

  return (
    <form
      ref={formRef}
      action={enabled ? formAction : undefined}
      className="relative bg-olive px-5 py-8 sm:px-8 sm:py-10"
      aria-busy={pending}
      onSubmit={(event) => {
        if (!enabled) event.preventDefault();
      }}
      noValidate
    >
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {!enabled ? (
        <p id={statusId} role="status" className="mb-8 border border-ink/15 bg-ivory px-4 py-3 text-sm leading-relaxed text-ink">
          This form is not connected to a mailbox yet. Nothing you type here is sent.
        </p>
      ) : null}

      {state.status === "sent" ? (
        <p id={statusId} role="status" className="mb-8 border border-ink/15 bg-ivory px-4 py-3 text-sm leading-relaxed text-ink">
          {state.message ?? "Your inquiry has been sent."}
        </p>
      ) : null}

      {state.status === "unconfigured" ? (
        <p id={statusId} role="status" className="mb-8 border border-ink/15 bg-ivory px-4 py-3 text-sm leading-relaxed text-ink">
          {state.message}
        </p>
      ) : null}

      {state.status === "error" ? (
        <p id={statusId} role="alert" className="mb-8 border border-ink/15 bg-ivory px-4 py-3 text-sm leading-relaxed text-ink">
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor="name" className="text-sm text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? nameErrorId : undefined}
          className={fieldClassName}
        />
        {nameError ? (
          <p id={nameErrorId} className="mt-2 text-sm text-ink">
            {nameError}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <label htmlFor="email" className="text-sm text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? emailErrorId : undefined}
          className={fieldClassName}
        />
        {emailError ? (
          <p id={emailErrorId} className="mt-2 text-sm text-ink">
            {emailError}
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 min-[28rem]:grid-cols-[minmax(0,1fr)_10.5rem] min-[28rem]:items-start min-[28rem]:gap-6">
        <div>
          <label htmlFor="message" className="text-sm text-ink">
            Message <span className="text-ink-soft">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            aria-invalid={messageError ? true : undefined}
            aria-describedby={messageError ? `${messageErrorId} message-note` : "message-note"}
            className={`${fieldClassName} resize-y`}
          />
          {messageError ? (
            <p id={messageErrorId} className="mt-2 text-sm text-ink">
              {messageError}
            </p>
          ) : null}
        </div>
        <p id="message-note" className="text-sm leading-relaxed text-ink-soft min-[28rem]:pt-8">
          Please avoid including sensitive health information in this form.
        </p>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={!enabled || pending}
          className={`inline-flex min-h-12 items-center justify-center px-5 text-base transition-colors disabled:cursor-not-allowed ${
            enabled
              ? "bg-ink text-ivory hover:bg-[#31424c] disabled:opacity-70"
              : "border border-ink/30 bg-transparent text-ink"
          }`}
        >
          {pending ? "Sending…" : enabled ? "Send inquiry" : "Not yet connected"}
        </button>
      </div>
    </form>
  );
}
