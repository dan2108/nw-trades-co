/**
 * NW Trades Co — scripted demo assistant.
 *
 * A lightweight, fully client-side conversation engine for the sales demo.
 * No LLM, no API key, no backend: it keyword-matches the visitor's message,
 * gives realistic price guidance, confirms coverage, then hands off to WhatsApp.
 */

export type BotState = {
  stage: "idle" | "awaiting_location";
  pendingJob?: { label: string; price: string };
  exchanges: number;
};

export type BotResult = {
  reply: string;
  offerWhatsApp?: boolean;
  jobSummary?: string;
};

export type BotTurn = BotResult & { nextState: BotState };

export const INITIAL_STATE: BotState = { stage: "idle", exchanges: 0 };

export const GREETING =
  "Hi! I'm the NW Trades Co assistant — what job can I help you with today?";

// --- North West coverage ------------------------------------------------------

const TOWN_DISPLAY: Record<string, string> = {
  wigan: "Wigan",
  bolton: "Bolton",
  manchester: "Manchester",
  salford: "Salford",
  preston: "Preston",
  liverpool: "Liverpool",
  warrington: "Warrington",
  chester: "Chester",
  bury: "Bury",
  stockport: "Stockport",
  oldham: "Oldham",
  rochdale: "Rochdale",
  wirral: "Wirral",
  birkenhead: "Birkenhead",
  "st helens": "St Helens",
  leigh: "Leigh",
  blackburn: "Blackburn",
  burnley: "Burnley",
  southport: "Southport",
  widnes: "Widnes",
  runcorn: "Runcorn",
  crewe: "Crewe",
  macclesfield: "Macclesfield",
  ashton: "Ashton",
  atherton: "Atherton",
  chorley: "Chorley",
  ormskirk: "Ormskirk",
  skelmersdale: "Skelmersdale",
};

function detectTown(text: string): string | null {
  for (const key of Object.keys(TOWN_DISPLAY)) {
    const re = new RegExp(`\\b${key}\\b`, "i");
    if (re.test(text)) return TOWN_DISPLAY[key];
  }
  return null;
}

// --- Job catalogue (ordered specific → general) -------------------------------

type Job = { test: RegExp; label: string; price: string };

const JOBS: Job[] = [
  {
    test: /(boiler|combi).*(install|new|replace|fit|swap|upgrade)|(install|new|replace|fit|swap|upgrade).*(boiler|combi)/i,
    label: "Boiler installation",
    price:
      "A new boiler is typically **£1,800–£3,500** fitted, depending on the model and where it's going.",
  },
  {
    test: /(bathroom|en[\s-]?suite|shower room|wet ?room)/i,
    label: "Bathroom fitting",
    price:
      "A full bathroom fit usually runs **£4,000–£8,000** depending on the spec and tiling.",
  },
  {
    test: /(ev|electric car|car charger|charge ?point|charging point|ev charger)/i,
    label: "EV charger install",
    price:
      "An EV charger install is usually **£900–£1,400** fitted — and there may be a government grant you qualify for.",
  },
  {
    test: /(rewire|re-?wiring)/i,
    label: "Rewire",
    price:
      "A full rewire on a 3-bed is around **£3,500–£6,000**, done to current 18th Edition standards.",
  },
  {
    test: /(consumer unit|fuse ?board|fuse ?box)/i,
    label: "Consumer unit upgrade",
    price: "A consumer unit (fuse board) upgrade is typically **£450–£700**.",
  },
  {
    test: /(tile|tiling|tiled)/i,
    label: "Tiling",
    price:
      "Tiling is usually **£40–£70 per m²**, depending on the tile and the area.",
  },
  {
    test: /(extension|extend|orangery|conservatory)/i,
    label: "Extension",
    price:
      "Extensions start around **£20,000** and really need a quick site visit so we can quote it properly.",
  },
  {
    test: /(renovation|renovate|refurb|refurbish|loft|conversion|new kitchen|kitchen fit)/i,
    label: "Renovation / building work",
    price:
      "Bigger building jobs vary a lot — the best next step is a free site visit so we can scope it accurately.",
  },
  {
    test: /(boiler|central heating|heating|radiator|no hot water|no heat|thermostat)/i,
    label: "Boiler / heating repair",
    price:
      "Most boiler repairs come in around **£120–£300**, with an **£80** call-out if it's an emergency.",
  },
  {
    test: /(leak|burst|pipe|drip|tap|blocked|blockage|drain|toilet|cistern|overflow|flood|waste)/i,
    label: "Plumbing repair",
    price:
      "Most plumbing repairs are **£120–£300**, plus an **£80** call-out for emergencies — we can often get to you the same day.",
  },
  {
    test: /(socket|sockets|light|lighting|switch|wiring|downlight|spotlight|fuse|electric|electrical|spark)/i,
    label: "Electrical work",
    price:
      "Smaller electrical jobs are usually a few hundred pounds — we'll give you an exact figure with a free quote.",
  },
];

function detectJob(text: string): Job | null {
  return JOBS.find((j) => j.test.test(text)) ?? null;
}

// --- Intent helpers -----------------------------------------------------------

const RE = {
  greeting: /\b(hi|hey|hello|yo|morning|afternoon|evening|alright)\b/i,
  services: /(what do you|what can you|services|what.*offer|help with|do you do)/i,
  coverage:
    /(cover|coverage|area|areas|where.*based|where are you|do you come|come to|come out|located|location|near me|travel|how far|do you cover)/i,
  pricing: /(price|pricing|cost|costs|how much|quote|estimate|ballpark|rough|cheap|expensive|charge)/i,
  emergency: /(emergency|urgent|asap|right now|leaking everywhere|no power|burst|flooding)/i,
  human: /(speak|talk|call me|phone me|contact|book|whatsapp|human|someone|come out|arrange|appointment|message)/i,
  thanks: /(thank|thanks|cheers|ta\b|perfect|brilliant|great|that's great|lovely|sound)/i,
  yes: /^(\s*)(yes|yeah|yep|go on|please|ok|okay|sure|sounds good|why not)(\s*)$/i,
};

const SERVICES_REPLY =
  "We're a one-stop trades team covering the North West. We do:\n\n• **Plumbing** — leaks, boilers & bathrooms\n• **Electrical** — rewires, fuse boards & EV chargers\n• **General building** — extensions, renovations & tiling\n\nWhat are you after a hand with?";

const COVERAGE_BODY =
  "We cover the whole North West: Greater Manchester, Lancashire, Merseyside and Cheshire. Wigan, Bolton, Manchester, Preston, Liverpool, Warrington, Chester and everywhere in between.\n\nWhat job can we help with?";

function handoffLine(job?: string): string {
  return job
    ? `Tap the green **Get Your Free Quote on WhatsApp** button below and it'll send your ${job.toLowerCase()} straight to the team — we usually come back with a free quote within the hour.`
    : "Tap the green **Get Your Free Quote on WhatsApp** button below and the team will pick it up — usually a free quote back within the hour.";
}

// --- Main responder -----------------------------------------------------------

export function respond(rawText: string, state: BotState): BotTurn {
  const text = rawText.trim();
  const exchanges = state.exchanges + 1;
  const town = detectTown(text);

  // Step 2 of a job flow: we asked where they are, now we hand off.
  if (state.stage === "awaiting_location" && state.pendingJob) {
    const job = state.pendingJob;
    const where = town ?? null;
    const summary = `${job.label}${where ? ` in ${where}` : ""}`;
    const reply = where
      ? `Great — we're all over ${where}. ${handoffLine(job.label)}`
      : `No problem, we cover the whole North West. ${handoffLine(job.label)}`;
    return {
      reply,
      offerWhatsApp: true,
      jobSummary: summary,
      nextState: { stage: "idle", exchanges, pendingJob: undefined },
    };
  }

  // A specific job was mentioned.
  const job = detectJob(text);
  if (job) {
    if (town) {
      return {
        reply: `${job.price}\n\nWe cover ${town}, so we can definitely help. ${handoffLine(
          job.label
        )}`,
        offerWhatsApp: true,
        jobSummary: `${job.label} in ${town}`,
        nextState: { stage: "idle", exchanges, pendingJob: undefined },
      };
    }
    return {
      reply: `${job.price}\n\nWhereabouts in the North West are you based?`,
      nextState: {
        stage: "awaiting_location",
        pendingJob: { label: job.label, price: job.price },
        exchanges,
      },
    };
  }

  // No job — handle conversational intents.
  const idle = (r: BotResult): BotTurn => ({
    ...r,
    nextState: { stage: "idle", exchanges, pendingJob: undefined },
  });

  if (RE.emergency.test(text)) {
    return idle({
      reply:
        "Sounds like one to jump on quickly — we run a same-day emergency service across the North West. " +
        handoffLine(),
      offerWhatsApp: true,
    });
  }

  if (RE.human.test(text) || RE.yes.test(text)) {
    return idle({
      reply: "Of course. " + handoffLine(),
      offerWhatsApp: true,
    });
  }

  if (RE.coverage.test(text) || (town && !job)) {
    const lead = town ? `${town}'s well within our patch. ` : "Yes, we do. ";
    return idle({ reply: lead + COVERAGE_BODY });
  }

  if (RE.services.test(text)) {
    return idle({ reply: SERVICES_REPLY });
  }

  if (RE.pricing.test(text)) {
    return idle({
      reply:
        "Happy to give you a rough idea — what's the job? For example a boiler repair, a rewire, a new bathroom or an extension.",
    });
  }

  if (RE.thanks.test(text)) {
    return idle({
      reply:
        "Anytime. Whenever you're ready, " +
        handoffLine().charAt(0).toLowerCase() +
        handoffLine().slice(1),
      offerWhatsApp: true,
    });
  }

  if (RE.greeting.test(text) && exchanges <= 1) {
    return idle({
      reply:
        "Hi there! Tell me what needs doing — boiler, rewire, bathroom, extension, anything — and I'll give you a rough price and get you booked in.",
    });
  }

  // Fallback — nudge toward a concrete job.
  return idle({
    reply:
      "We handle plumbing, electrical and general building work right across the North West. What's the job — and roughly where are you based?",
  });
}
