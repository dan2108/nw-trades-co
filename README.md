# NW Trades Co — Demo Site + Scripted Enquiry Assistant

A single-page marketing site for a fictional North West trades business (plumbing,
electrical & general building), with a floating chat assistant that answers FAQs,
gives rough price ranges, and hands the prospect off to WhatsApp with their job
description pre-filled — **no form, no webhook, no database, and no API key.**

**Stack:** Next.js 15 (App Router) · Tailwind CSS · Space Grotesk / DM Sans · lucide-react icons.

---

## The chat assistant is scripted (by design)

This is a **sales demo**, so the assistant is a self-contained, rule-based script
([`lib/demoBot.ts`](lib/demoBot.ts)) that runs **entirely in the browser** — no LLM,
no API key, no backend, zero running cost. It keyword-matches the visitor's message to:

- answer FAQs about services and the North West coverage area,
- quote realistic price ranges for common jobs (boiler, rewire, bathroom, EV charger…),
- ask whereabouts they are, then surface a **"Get Your Free Quote on WhatsApp"** button
  that opens `wa.me/<number>` with the job pre-filled.

Because there's no server call, the whole site builds to **static output** and works on
any host. To swap in a real LLM later, reintroduce an API route and point the widget at it.

---

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — that's it, no `.env` needed.

### Environment variables (all optional)

| Variable                       | Required | Notes                                                                                          |
| ------------------------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | no       | Business WhatsApp number, international digits only. Defaults to the Ofcom test number `447700900123`. |

---

## Lead handoff — WhatsApp (no backend)

Once the assistant understands the job, the widget shows a green
**"Get Your Free Quote on WhatsApp"** button that opens `wa.me/<number>` with a message
pre-filled from the chat — so the prospect lands in the business's WhatsApp inbox with
their job already described. No form, no email, no webhook, no database.
See [`lib/demoBot.ts`](lib/demoBot.ts) and [`components/ChatWidget.tsx`](components/ChatWidget.tsx).

---

## Deploy

No secrets are required for any host. Optionally set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the
real business number; otherwise it falls back to the test number.

### Option A — Netlify dashboard (this repo)
A [`netlify.toml`](netlify.toml) is included (Next.js Runtime + Node 20), so the import auto-configures.
1. https://app.netlify.com → **Add new site → Import an existing project → GitHub**
   (authorise Netlify for the private repo if prompted) → pick `dan2108/nw-trades-co`.
2. Build settings auto-detect — leave them (command `npm run build`, plugin `@netlify/plugin-nextjs`).
3. *(Optional)* **Site configuration → Environment variables** → add `NEXT_PUBLIC_WHATSAPP_NUMBER`.
4. **Deploy site** → live `*.netlify.app` URL in ~1–2 minutes. Re-deploys on every `git push`.

### Option B — Vercel dashboard (this repo)
1. https://vercel.com → **Add New… → Project** → **Import** `dan2108/nw-trades-co`
   (authorise Vercel for GitHub if prompted). Framework auto-detects as **Next.js**.
2. *(Optional)* add `NEXT_PUBLIC_WHATSAPP_NUMBER` under **Environment Variables**.
3. **Deploy.** Live `*.vercel.app` URL in ~1 minute.

### Option C — CLI (headless)
```bash
# Netlify
npm i -g netlify-cli && netlify login   # or NETLIFY_AUTH_TOKEN=...
netlify init && netlify deploy --build --prod

# Vercel
npm i -g vercel && vercel --prod
```

---

## Project structure

```
app/
  layout.tsx          # fonts (Space Grotesk / DM Sans), metadata, viewport
  page.tsx            # composes all sections
  globals.css         # Tailwind + grain/hairline helpers + reduced-motion
components/
  Header / Hero / Marquee / Services / WhyUs / Testimonials / Contact / Footer
  ChatWidget.tsx      # floating scripted assistant + WhatsApp handoff button
  SectionHeading.tsx  # numbered editorial section headers
  Logo.tsx
lib/
  demoBot.ts          # scripted conversation engine (no LLM / no key)
```
