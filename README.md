# Richia Martinez

Portfolio website for Richia Martinez, clinical psychologist. The public page reads from `src/content/site.ts`.

## Edit content

Verified facts (email, phone, portrait, background, writing, footer details) stay hidden until they are filled in. Draft biography, focus areas, approach, and practical answers are marked on the page until Richia replaces them.

## Inquiries

The contact form stores each note on the private desk at `/dashboard` and sends a copy to the address in `verified.email`. The password is `DASHBOARD_PASSWORD` in `.env.local`.

If the mail relay cannot deliver, the note stays on the desk and is marked “Kept here only.” For delivery through Gmail itself, add `GMAIL_USER` and `GMAIL_APP_PASSWORD` to `.env.local`. The app password is created in the Google account, under Security → App passwords.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
