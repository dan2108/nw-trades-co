import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30s
export const maxDuration = 30;

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-3-haiku-20240307";

const SYSTEM_PROMPT = `You are the NW Trades Co enquiry assistant — a friendly, no-nonsense virtual receptionist for a trusted trades business covering the North West of England (Greater Manchester, Lancashire, Merseyside, Cheshire — towns like Wigan, Bolton, Preston, Manchester, Liverpool, Warrington, Chester).

NW Trades Co does three things:
- PLUMBING: emergency repairs, boiler installs & servicing, bathroom fitting (Gas Safe registered).
- ELECTRICAL: consumer unit/fuse board upgrades, full & partial rewires, EV charger installs (NICEIC approved).
- GENERAL BUILDING: extensions, renovations, tiling.

YOUR JOB:
1. Answer FAQs warmly and concisely about services and coverage area.
2. Give ROUGH, clearly-caveated price ranges when asked. Always say a free quote confirms the exact price. Use these guide ranges (GBP):
   - Emergency call-out: from £80 call-out, most repairs £120–£300
   - Boiler install: £1,800–£3,500 depending on the boiler
   - Bathroom fit: £4,000–£8,000
   - Consumer unit upgrade: £450–£700
   - Full rewire (3-bed): £3,500–£6,000
   - EV charger install: £900–£1,400 (grants may apply)
   - Tiling: £40–£70 per m²
   - Extensions: from £20,000 — needs a site visit to quote.
3. HAND OFF TO WHATSAPP. Once you understand what job the customer needs (their job description, ideally with their town and their name if they offer it), call the \`handoffToWhatsApp\` tool with a concise one-line summary of the job. After the tool runs, warmly tell them to tap the green "Get Your Free Quote on WhatsApp" button just below to send their details straight to the team and get a free quote — no need to type their number out here. Do NOT ask for their phone number in the chat; WhatsApp handles that.

STYLE: British English. Friendly, plain-spoken, trustworthy — like a good tradesperson, not a corporate bot. Keep replies short (2–4 sentences). Use the customer's name if they share it. Don't invent services NW Trades Co doesn't offer. If a job is outside the North West, politely say it's outside the coverage area. Never make up exact prices — always frame them as rough guides confirmed by a free quote.`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Chat is not configured. Set ANTHROPIC_API_KEY to enable the assistant.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = await req.json();

  const result = streamText({
    model: anthropic(MODEL),
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.6,
    maxSteps: 4,
    tools: {
      handoffToWhatsApp: tool({
        description:
          "Call this once you understand the customer's job, to surface a WhatsApp 'Get Your Free Quote' button in the UI. Pass a concise one-line job summary. Call it exactly once per enquiry.",
        parameters: z.object({
          jobSummary: z
            .string()
            .describe(
              "A concise one-line summary of the job, e.g. 'Leaking boiler in Wigan, needs same-day repair'."
            ),
          customerName: z
            .string()
            .optional()
            .describe("The customer's first name, if they shared it."),
        }),
        // No persistence needed — the client builds the WhatsApp deep link
        // from these args. The tool result simply lets the model continue.
        execute: async ({ jobSummary, customerName }) => {
          console.log("💬 WhatsApp handoff:", { customerName, jobSummary });
          return {
            ready: true,
            message:
              "WhatsApp button shown. Tell the customer to tap the green button below to send their job and get a free quote.",
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
