"use server";

import { saveInquiry } from "@/lib/inquiries";
import { deliverInquiryEmail } from "@/lib/mail";

export type InquiryState = {
  status: "idle" | "sent" | "unconfigured" | "invalid" | "error";
  message?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { status: "sent" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const fieldErrors: NonNullable<InquiryState["fieldErrors"]> = {};

  if (!name) {
    fieldErrors.name = "Please enter your name.";
  } else if (name.length > 120) {
    fieldErrors.name = "Please use a name under 120 characters.";
  }

  if (!email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (message.length > 2000) {
    fieldErrors.message = "Please keep the message under 2000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "invalid", fieldErrors };
  }

  try {
    const emailed = await deliverInquiryEmail({ name, email, message });
    await saveInquiry({ name, email, message, emailed });
    return {
      status: "sent",
      message: emailed
        ? "Your inquiry has been sent."
        : "Your inquiry has been received.",
    };
  } catch (error) {
    console.error("submitInquiry failed", error);
    return {
      status: "error",
      message: "The message could not be delivered. Please try again later.",
    };
  }
}
