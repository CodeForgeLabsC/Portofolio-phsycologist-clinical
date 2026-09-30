import tls from "node:tls";
import { verified } from "@/content/site";

export async function deliverInquiryEmail(input: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  if (await deliverViaGmail(input)) return true;
  return deliverViaFormSubmit(input);
}

async function deliverViaGmail(input: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const user = process.env.GMAIL_USER?.trim() || verified.email || "";
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "") ?? "";
  const to = verified.email;
  if (!user || !pass || !to) return false;

  const lines = [
    `From: ${user}`,
    `To: ${to}`,
    `Reply-To: ${input.email}`,
    `Subject: Inquiry from ${input.name}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    "",
    input.message || "(No message was included.)",
  ];
  const data = lines
    .map((line) => (line.startsWith(".") ? `.${line}` : line))
    .join("\r\n");

  try {
    return await smtpSend({
      user,
      pass,
      from: user,
      to,
      data: `${data}\r\n.`,
    });
  } catch {
    return false;
  }
}

function smtpSend(input: {
  user: string;
  pass: string;
  from: string;
  to: string;
  data: string;
}): Promise<boolean> {
  const commands = [
    "EHLO localhost",
    "AUTH LOGIN",
    Buffer.from(input.user).toString("base64"),
    Buffer.from(input.pass).toString("base64"),
    `MAIL FROM:<${input.from}>`,
    `RCPT TO:<${input.to}>`,
    "DATA",
    input.data,
    "QUIT",
  ];

  return new Promise((resolve) => {
    const socket = tls.connect(465, "smtp.gmail.com", {
      servername: "smtp.gmail.com",
    });
    let buffer = "";
    let step = 0;
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      socket.end();
      resolve(ok);
    };

    socket.setTimeout(12000, () => finish(false));
    socket.on("error", () => finish(false));
    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      const parts = buffer.split("\n");
      buffer = parts.pop() ?? "";
      const complete = parts.map((line) => line.replace(/\r$/, "")).filter(Boolean);
      if (complete.length === 0) return;
      const last = complete[complete.length - 1];
      if (last.length >= 4 && last[3] === "-") return;
      const code = Number(last.slice(0, 3));
      if (!Number.isFinite(code) || code >= 400) {
        finish(false);
        return;
      }
      if (step >= commands.length) {
        finish(true);
        return;
      }
      socket.write(`${commands[step++]}\r\n`);
    });
  });
}

async function deliverViaFormSubmit(input: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const to = verified.email;
  if (!to) return false;

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          message: input.message || "(No message was included.)",
          _subject: `Inquiry from ${input.name}`,
          _template: "table",
          _captcha: "false",
          _replyto: input.email,
        }),
        cache: "no-store",
      },
    );

    const data = (await response.json().catch(() => null)) as {
      success?: boolean | string;
    } | null;

    return (
      response.ok &&
      (data?.success === true || data?.success === "true")
    );
  } catch {
    return false;
  }
}
