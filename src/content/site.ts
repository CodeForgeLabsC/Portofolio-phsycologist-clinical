/**
 * Editable content for Richia Martinez’s website.
 *
 * Public copy lives here. Do not add a license number, a school, a city,
 * a fee, or a testimonial she has not given you.
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
  label: "Ask for a first conversation",
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
  background: [
    {
      period: "The hour",
      title: "Fifty minutes, usually the same one.",
      detail:
        "Most people come weekly. The same day and hour, when the calendar allows it, so the week has a place to land.",
    },
    {
      period: "Before that",
      title: "A conversation, not a signup.",
      detail:
        "We talk once before anything is scheduled. You can ask how I work. I can say whether I have room, and whether I am the right person.",
    },
    {
      period: "Privacy",
      title: "What you say stays in the work.",
      detail:
        "There are a few limits the law requires, mostly when someone is in danger. I explain those out loud in the first meeting, not in a footnote.",
    },
    {
      period: "The fit",
      title: "You can leave.",
      detail:
        "Starting does not lock you in. If the work is not helping, we say so. If I am not the right clinician, I will tell you that too.",
    },
  ],
  writing: [],
  footerDetails: [
    "Private practice",
    "Adults",
    "Office sessions and secure video",
  ],
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
    supplied: true,
    annotation: "",
    opening: "People come when the capable version of them is tired.",
    paragraphs: [
      "I am a clinical psychologist in private practice. I work with adults. The usual reasons are worry that will not turn off, a loss that rearranged the house, or a relationship that keeps having the same argument.",
      "You do not need a diagnosis, a referral, or a tidy explanation. A name and a sentence about what has been hard are enough to start.",
      "I will not pretend this page knows you. If we meet, the first job is to find out whether I am actually the right person to sit with you.",
    ],
  },
  workDisclaimer:
    "These are the reasons people usually call. You do not have to match a category. If your situation is adjacent to one of these, write anyway.",
  focusAreas: [
    {
      id: "braced",
      status: "verified",
      area: "A mind that will not clock out",
      audience: "Adults who look steady at work and feel braced the rest of the time.",
      description:
        "Worry with no off switch. A short temper at home. Sleep that starts late and ends early. The day can look ordinary from the outside and still feel like something is about to go wrong.",
    },
    {
      id: "after",
      status: "verified",
      area: "After the life changed",
      audience: "People living next to a loss, an ending, or news that split the year in two.",
      description:
        "A death, an illness in the family, a divorce, a move, a child leaving. The errands continue. The inside of the week has not caught up, and friends are ready for you to be finished.",
    },
    {
      id: "close",
      status: "verified",
      area: "The same fight, again",
      audience: "Adults who want to understand a pattern with a partner, a parent, or themselves.",
      description:
        "You know your line before you say it. Then the silence. Then the apology that does not change next Thursday. We look at what happens between you and the person you cannot stop thinking about, including the part you play.",
    },
    {
      id: "restart",
      status: "verified",
      area: "Starting over without a script",
      audience: "People in a new city, a new job, or the first year of a life they chose.",
      description:
        "The decision was right and it still feels thin. You are competent in the new room and lonely after it. This is not a coaching program. It is a place to tell the truth about a beginning that was supposed to feel better than this.",
    },
  ] satisfies FocusArea[],
  approach: {
    reviewed: true,
    note: "I work in plain language. We stay with what actually happened in the week, not a theory you have to learn.",
    steps: [
      {
        id: "first-conversation",
        title: "We talk before anyone is on the calendar.",
        body: "You write. I write back. If I have room, we set a short conversation, by phone or video, to hear what brought you and whether this practice is a fit. That conversation is not a session, and it does not hold a time for you.",
      },
      {
        id: "early-hours",
        title: "The early hours are specific.",
        body: "If we begin, the first sessions get concrete: what the week looks like, what you have already tried, who is affected, and what you want to be different by spring. You can disagree with me. That is useful.",
      },
      {
        id: "the-work",
        title: "Then it becomes a rhythm.",
        body: "Most people come weekly. Some come every other week once the work has a shape. You can pause. You can stop. I would rather you leave honestly than stay out of politeness.",
      },
    ] satisfies ApproachStep[],
  },
  questions: [
    {
      id: "availability",
      question: "How do I ask if you have room?",
      answer:
        "Use the form. Your name, your email, and a sentence or two are enough. Please do not include medical details you would not want in an email. I read these myself.",
      placeholder: false,
    },
    {
      id: "format",
      question: "Do you meet in person or by video?",
      answer:
        "Both. Some people come to the office. Others meet by secure video, especially when the drive is what would keep them from coming. We choose that before the first session, not after you have already rearranged a month.",
      placeholder: false,
    },
    {
      id: "fees",
      question: "What does a session cost?",
      answer:
        "I am private pay, and I tell you the fee and the length of a session before anything is scheduled. I do not bill insurance. If you want to ask your plan for reimbursement, I can give you a statement to submit. I will not guess here at a number that might be wrong by the time you call.",
      placeholder: false,
    },
    {
      id: "after-contact",
      question: "What happens after I write?",
      answer:
        "If I have room, I reply by email and offer a time to talk. A reply is not an appointment. If I am full, I say so rather than leave you waiting. Please do not assume an hour has been held.",
      placeholder: false,
    },
    {
      id: "who",
      question: "Who do you see?",
      answer:
        "Adults. I do not see children, and I do not do court evaluations, custody work, or emergency coverage. If you need a psychiatrist for medication, I can talk with you about finding one. I do not prescribe.",
      placeholder: false,
    },
    {
      id: "crisis",
      question: "What if I am in crisis?",
      answer:
        "This page is not a crisis service, and I do not monitor it overnight. If you are in immediate danger in the United States, call 911. If you need to talk with someone now, call or text 988.",
      placeholder: false,
    },
  ] satisfies Question[],
};
