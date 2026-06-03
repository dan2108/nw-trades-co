# NW Trades Co — Demo Site + AI Enquiry Assistant

A single-page marketing site for a fictional North West trades business (plumbing,
electrical & general building), with a floating AI chat assistant that answers FAQs,
gives rough price ranges, and hands the prospect off to WhatsApp with their job
description pre-filled — no form, no webhook, no database.

**Stack:** Next.js 15 (App Router) · Tailwind CSS · Vercel AI SDK · Claude (Anthropic) · lucide-react icons.

---

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then paste your Anthropic key into .env.local
npm run dev
```

Open http://localhost:3000

The site (hero, services, why-us, testimonials, contact form, footer) works without any
key. The **chat assistant** needs `ANTHROPIC_API_KEY` to generate replies — without it
the widget still loads and shows a graceful "unavailable" message.

### Environment variables

| Variable                       | Required | Notes                                                  |
| ------------------------------ | -------- | ------------------------------------------------------ |
| `ANTHROPIC_API_KEY`            | yes (for chat) | Get one at https://console.anthropic.com/settings/keys |
| `ANTHROPIC_MODEL`              | no       | Defaults to `claude-3-haiku-20240307` (cheapest).      |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | no       | Business WhatsApp number, intl digits only. Defaults to the Ofcom test number `447700900123`. |

---

## Lead handoff — WhatsApp (no backend)

Once the assistant understands the job, it calls a `handoffToWhatsApp` tool with a
one-line job summary. The widget then shows a green **"Get Your Free Quote on WhatsApp"**
button that opens `wa.me/<number>` with a message pre-filled from the chat — so the
prospect lands in the business's WhatsApp inbox with their job already described.

No form, no email, no webhook, no database. The same button also appears as a fallback
if the chat is ever unavailable. See [`app/api/chat/route.ts`](app/api/chat/route.ts)
and [`components/ChatWidget.tsx`](components/ChatWidget.tsx).

---

## Deploy to Vercel

### Option A — Vercel dashboard (no CLI)
1. Push this folder to a GitHub repo.
2. On https://vercel.com → **Add New… → Project** → import the repo.
3. Add env var `ANTHROPIC_API_KEY` in the project settings.
4. Deploy. Vercel auto-detects Next.js.

### Option B — Vercel CLI (headless)
```bash
npm i -g vercel
vercel link           # or: vercel --token <TOKEN> --yes
vercel env add ANTHROPIC_API_KEY production
vercel --prod
```

---

## Project structure

```
app/
  layout.tsx          # fonts (Poppins/Open Sans), metadata, viewport
  page.tsx            # composes all sections
  globals.css         # Tailwind + reduced-motion + scrollbar
  api/chat/route.ts   # Vercel AI SDK + Claude, handoffToWhatsApp tool
components/
  Header / Hero / Services / WhyUs / Testimonials / Contact / Footer
  ChatWidget.tsx      # floating assistant + WhatsApp handoff button
  Logo.tsx
```
