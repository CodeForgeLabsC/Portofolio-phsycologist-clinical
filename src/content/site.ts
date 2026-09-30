/**
 * Editable content for Richia Martinez’s website.
 *
 * Two groups live here:
 * - `verified` — facts Richia has confirmed. Empty values stay off the public page.
 * - `drafts` — provisional copy, clearly marked, until she replaces it.
 *
 * Do not add institutions, licenses, methods, populations, fees, or a biography
 * that she has not supplied.
 *
 * Inquiries are kept on the private desk at /dashboard and a copy is sent
 * to the address in `verified.email`.
 */

export const profile = {
  name: "Richia Martinez",
  role: "Clinical Psychologist",
} as const;

export const navigation = [
  { href: "/#about", label: "About" },
  { href: "/#approach", label: "Approach" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
] as const;

export const primaryAction = {
  href: "/#contact",
  label: "Ask about availability",
} as const;

export type BackgroundEntry = {
  period: string;
  title: string;
  detail?: string;
};

export type WritingEntry = {
  title: string;
  context?: string;
  href?: string;
};

/**
 * Confirmed facts only. Leave arrays empty and optional fields null until
 * Richia provides them. The public page hides anything that is empty.
 */
export const verified: {
  email: string | null;
  phone: string | null;
  portrait: { src: string; alt: string } | null;
  background: BackgroundEntry[];
  writing: WritingEntry[];
  footerDetails: string[];
} = {
  email: "Richiaptino@gmail.com",
  phone: null,
  portrait: {
    src: "/portrait.jpg",
    alt: "Richia Martinez",
  },
  background: [],
  writing: [],
  footerDetails: [],
};

export type FocusArea = {
  id: string;
  status: "draft" | "verified";
  area: string;
  audience: string;
  description: string;
};

export type ApproachStep = {
  id: string;
  title: string;
  body: string;
};

export type Question = {
  id: string;
  question: string;
  answer: string;
  /** True while the answer is still a placeholder Richia needs to replace. */
  placeholder: boolean;
};

export const drafts = {
  biography: {
    /** Set to true only after the opening and paragraphs are Richia’s own text. */
    supplied: false,
    annotation: "Draft — biography not yet supplied",
    opening: "A biography will sit here, in Richia’s words.",
    paragraphs: [
      "This column is reserved for a short personal introduction. It is unfinished on purpose, rather than filled with a story that has not been written.",
      "Training, licensure, and experience will be added only after they are confirmed.",
    ],
  },
  workDisclaimer:
    "These entries are drafts. They are not a list of Richia’s specialties, and they do not describe who she works with. Each slot is waiting for her own wording.",
  focusAreas: [
    {
      id: "focus-1",
      status: "draft",
      area: "Area of focus",
      audience: "Not yet specified",
      description:
        "A short, plain-language description will replace this line after Richia reviews it.",
    },
    {
      id: "focus-2",
      status: "draft",
      area: "Area of focus",
      audience: "Not yet specified",
      description:
        "A short, plain-language description will replace this line after Richia reviews it.",
    },
    {
      id: "focus-3",
      status: "draft",
      area: "Area of focus",
      audience: "Not yet specified",
      description:
        "A short, plain-language description will replace this line after Richia reviews it.",
    },
  ] satisfies FocusArea[],
  approach: {
    /** Set to true after Richia replaces the steps with her own account of the inquiry. */
    reviewed: false,
    note: "Provisional copy for Richia’s review. These lines describe making an inquiry. They do not describe a therapeutic method.",
    steps: [
      {
        id: "first-conversation",
        title: "The first conversation.",
        body: "You can start by asking about availability. A name and an email are enough. You do not need to arrive with everything already explained.",
      },
      {
        id: "what-matters",
        title: "Understanding what matters.",
        body: "If a conversation follows, there is time to say what feels important and to ask practical questions. This website does not decide the shape of the work in advance.",
      },
      {
        id: "next-step",
        title: "Deciding on the next step.",
        body: "After that conversation, the next step is yours to choose. You can continue, pause, or decide not to go further.",
      },
    ] satisfies ApproachStep[],
  },
  questions: [
    {
      id: "availability",
      question: "How do I ask about availability?",
      answer:
        "Use the contact form on this page. It asks for your name, your email, and a short message if you want to add one. If the form is not connected to a mailbox yet, the page says so, and what you type is not sent.",
      placeholder: false,
    },
    {
      id: "format",
      question: "Are appointments online or in person?",
      answer:
        "Placeholder: this has not been specified. The answer will be updated when Richia confirms how she meets with people. Nothing here promises online or in-person appointments.",
      placeholder: true,
    },
    {
      id: "fees",
      question: "What are the fees?",
      answer:
        "Placeholder: fees are not listed yet. This answer will be replaced when Richia confirms what she charges. No rate is implied.",
      placeholder: true,
    },
    {
      id: "after-contact",
      question: "What happens after I contact you?",
      answer:
        "Placeholder: Richia has not yet described what happens after an inquiry. Please do not assume how soon you will hear back, or that a time has been held for you.",
      placeholder: true,
    },
  ] satisfies Question[],
};
