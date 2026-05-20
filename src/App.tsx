import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Gift,
  Languages,
  MapPin,
  Megaphone,
  Music2,
  Radio,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  Utensils,
  WalletCards,
} from "lucide-react";

type Venue = {
  name: string;
  category: string;
  neighborhood: string;
  benefit: string;
  validFrom: string;
  validTo: string;
  mapUrl: string;
};

const tickerItems = [
  { label: "World Cup 2026", value: "NYC visitor experiences from June 11 to July 19" },
  { label: "Bracelet pass", value: "Unlocks perks at participating venues" },
  { label: "Pickup", value: "In-person bracelet handoff in NYC" },
  { label: "Partners", value: "Sponsor, fundraiser, and venue options" },
];

const venues: Venue[] = [
  {
    name: "Hard Rock Cafe",
    category: "Sports bar",
    neighborhood: "Times Square",
    benefit: "Game-day watch parties and bracelet-holder specials.",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Hard+Rock+Cafe+Times+Square",
  },
  {
    name: "Copacabana",
    category: "Nightlife",
    neighborhood: "Midtown West",
    benefit: "Late-night energy with food and drink promos.",
    validFrom: "2026-06-15",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Copacabana+NYC",
  },
  {
    name: "Iron Bar",
    category: "Bar",
    neighborhood: "Chelsea",
    benefit: "Central pickup candidate and hospitality partner.",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Iron+Bar+NYC",
  },
  {
    name: "Fushimi",
    category: "Restaurant",
    neighborhood: "Midtown",
    benefit: "Food discounts and group-friendly dining.",
    validFrom: "2026-06-20",
    validTo: "2026-07-10",
    mapUrl: "https://maps.google.com/?q=Fushimi+NYC",
  },
  {
    name: "Planet Hollywood",
    category: "Entertainment",
    neighborhood: "Times Square",
    benefit: "Visitor-friendly pickup and event coordination.",
    validFrom: "2026-06-11",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=Planet+Hollywood+Times+Square",
  },
  {
    name: "High Key Rooftop",
    category: "Rooftop",
    neighborhood: "Murray Hill",
    benefit: "Rooftop watch moments and sponsor activations.",
    validFrom: "2026-06-25",
    validTo: "2026-07-19",
    mapUrl: "https://maps.google.com/?q=High+Key+Rooftop+NYC",
  },
];

const steps = [
  "Choose the dates you will be in town.",
  "Buy the pass through the external ticketing link.",
  "Pick up the bracelet in New York City.",
  "Show the bracelet to unlock venue benefits.",
  "Enjoy watch parties, specials, and sponsor moments.",
];

const partnerTypes = [
  "Institutions",
  "Community organizations",
  "Local businesses",
  "Hospitality groups",
];

const superpowers = [
  {
    icon: Trophy,
    title: "Watch the games",
    text: "Match-day rooms, big screens, and fan-friendly venues across NYC.",
  },
  {
    icon: WalletCards,
    title: "Unlock discounts",
    text: "Bracelet-holder offers while partner benefits are finalized.",
  },
  {
    icon: Utensils,
    title: "Food & drink specials",
    text: "Partner menus, quick bites, and late-night tables.",
  },
  {
    icon: Music2,
    title: "Nightlife perks",
    text: "A smoother path from the final whistle into NYC after-dark energy.",
  },
  {
    icon: MapPin,
    title: "Curated venues",
    text: "A practical route through restaurants, rooftops, bars, and activations.",
  },
  {
    icon: Gift,
    title: "Sponsor giveaways",
    text: "Limited partner gifts and brand moments as they become available.",
  },
];

const faqItems = [
  {
    question: "What is NYCUP26?",
    answer:
      "NYCUP26 is a World Cup–oriented bracelet pass that helps visitors discover venues, perks, and event-day experiences in New York City.",
  },
  {
    question: "How do I buy the bracelet?",
    answer:
      "The site sends users to an external ticketing platform. Checkout happens off-site, and the website explains pickup instructions clearly.",
  },
  {
    question: "Where do I pick it up?",
    answer:
      "Pickup is in person in NYC. The current build shows pickup candidates while the final location is confirmed.",
  },
  {
    question: "Can I filter by my travel dates?",
    answer:
      "Yes. The venue grid filters down to locations active during the selected date window, so visitors only see relevant options.",
  },
  {
    question: "Is this only for Brazilians?",
    answer:
      "No. It is a World Cup experience for visitors, fans, and communities from many backgrounds.",
  },
];

function App() {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English");
  const [travelStart, setTravelStart] = useState("");
  const [travelEnd, setTravelEnd] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const filteredVenues = useMemo(() => {
    if (!travelStart && !travelEnd) return venues;

    return venues.filter((venue) => {
      const start = travelStart || venue.validFrom;
      const end = travelEnd || venue.validTo;
      return venue.validFrom <= end && venue.validTo >= start;
    });
  }, [travelStart, travelEnd]);

  const signupMessage = useMemo(() => {
    if (status === "error") return "Enter a valid email address so we can follow up.";
    if (status === "success") return `You're on the list. We'll follow up in ${language}.`;
    return "Early access includes updates on venues, pickup, and ticketing.";
  }, [language, status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <main className="min-h-screen bg-us-cream text-us-navy">
      <header className="sticky top-0 z-40 border-b border-us-blue/10 bg-white/92 backdrop-blur">
        <div className="flag-band border-b border-white/20 text-white">
          <div className="flex h-11 items-center overflow-hidden">
            <div className="flex h-full shrink-0 items-center gap-2 bg-us-red px-4 text-xs font-black uppercase text-white">
              <Radio className="h-4 w-4" aria-hidden="true" />
              Live Board
            </div>
            <div className="ticker-track" aria-label="NYCUP26 updates">
              <TickerItems />
              <TickerItems ariaHidden />
            </div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="font-display text-lg leading-none text-us-blue">
            NYCUP26 <span className="text-us-red">GAME PASS</span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-extrabold text-us-blue md:flex">
            <a href="#venues" className="hover:text-us-red">Venues</a>
            <a href="#how-it-works" className="hover:text-us-red">How it works</a>
            <a href="#partners" className="hover:text-us-red">Partners</a>
            <a href="#faq" className="hover:text-us-red">FAQ</a>
          </div>
          <a
            href="#signup"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-extrabold text-us-navy transition hover:bg-[#EEF3FF]"
          >
            Waitlist
          </a>
        </nav>
      </header>

      <section id="top" className="relative overflow-hidden bg-us-navy text-white">
        <div className="absolute inset-0">
          <img
            src="/nycup26-hero.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-105 object-cover object-center opacity-35 blur-[3px] saturate-125"
          />
          <img
            src="/nycup26-hero.png"
            alt="Statue of Liberty holding a soccer trophy with a glowing NYCUP26 Game Pass bracelet"
            className="absolute inset-y-0 right-0 h-full w-full object-contain object-right opacity-100 drop-shadow-[0_30px_80px_rgba(215,40,47,0.34)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,74,0.98)_0%,rgba(7,27,74,0.86)_36%,rgba(7,27,74,0.20)_70%,rgba(7,27,74,0.16)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,74,0.10)_0%,rgba(7,27,74,0.04)_42%,rgba(7,27,74,0.74)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-us-red via-white to-us-blue opacity-95" />
          <div className="absolute right-[8%] top-[18%] hidden rounded-full border border-white/30 bg-us-navy/80 px-4 py-2 text-xs font-black uppercase text-white backdrop-blur-md md:block">
            Bracelet unlock signal
          </div>
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl content-end px-5 pb-12 pt-24 md:min-h-[760px] md:px-8 md:pb-16">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-us-red px-3 py-2 text-sm font-black text-white">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Unlock NYC during the World Cup.
            </div>
            <h1 className="font-display text-5xl uppercase leading-[0.95] text-white sm:text-6xl md:text-8xl">
              Your bracelet unlocks the city.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/90 md:text-xl">
              A festival-style visitor bracelet for World Cup fans in NYC: watch parties, curated venues,
              food and nightlife perks, sponsor moments, and a simple path to early access.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-base font-extrabold text-us-navy transition hover:bg-[#EEF3FF]"
              >
                Join the waitlist
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#venues"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/30 bg-us-blue/85 px-6 text-base font-extrabold text-white backdrop-blur-sm transition hover:bg-us-blue"
              >
                Explore venues
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <StatCard icon={CalendarDays} label="Event dates" value="June 11 - July 19, 2026" />
            <StatCard icon={Sparkles} label="Program length" value="34 days of events" />
            <StatCard icon={Ticket} label="Pass format" value="Visitor bracelet" />
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 rounded-2xl border border-us-blue/10 bg-white p-6 shadow-card md:grid-cols-[1fr_1.4fr] md:p-8">
          <div>
            <p className="text-sm font-black uppercase text-us-red">The concept</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-us-blue">A bracelet that doubles as a city guide.</h2>
          </div>
          <p className="text-base font-semibold leading-7 text-us-navy/70">
            Visitors choose dates, see relevant venues, and follow a simple path from signup to pickup. The design is
            clean, practical, and built to launch fast.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="section-shell">
        <SectionHeading
          eyebrow="How it works"
          title="Five simple steps from arrival to access."
          text="The flow stays obvious so travelers can understand the offer in seconds."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="rounded-xl border border-us-blue/10 bg-white p-5 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-us-blue font-black text-white">
                {index + 1}
              </div>
              <p className="mt-4 text-sm font-extrabold leading-6 text-us-blue">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="venues" className="section-shell bg-white">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured venues"
            title="Filter locations by your travel window."
            text="This version keeps the venue list easy to scan and trims it to relevant dates."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <DateField label="Arrival" value={travelStart} onChange={setTravelStart} />
            <DateField label="Departure" value={travelEnd} onChange={setTravelEnd} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredVenues.map((venue) => (
            <article key={venue.name} className="overflow-hidden rounded-2xl border border-us-blue/10 bg-us-cream shadow-card">
              <div className="h-2 bg-gradient-to-r from-us-red via-white to-us-blue" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-us-red">{venue.category}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-us-blue">{venue.name}</h3>
                  </div>
                  <MapPin className="h-5 w-5 shrink-0 text-us-blue" aria-hidden="true" />
                </div>

                <p className="mt-4 text-sm font-semibold leading-6 text-us-navy/70">{venue.benefit}</p>

                <div className="mt-5 grid gap-3 rounded-xl bg-white p-4">
                  <MetaRow icon={Clock3} label="Neighborhood" value={venue.neighborhood} />
                  <MetaRow icon={CalendarDays} label="Valid" value={`${venue.validFrom} to ${venue.validTo}`} />
                </div>

                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-us-blue hover:text-us-red"
                >
                  Open map
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredVenues.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-us-blue/20 bg-us-cream p-6 text-sm font-semibold text-us-navy/70">
            No venues match that travel window yet.
          </div>
        ) : null}
      </section>

      <section className="section-shell">
        <SectionHeading eyebrow="Bracelet superpowers" title="What users get from the pass." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {superpowers.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-us-blue/10 bg-white p-5 shadow-card">
              <Icon className="h-8 w-8 text-us-red" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl leading-tight text-us-blue">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-us-navy/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-us-blue text-white">
        <div className="section-shell grid gap-4 md:grid-cols-2">
          <InfoPanel
            eyebrow="Pickup"
            title="In-person bracelet pickup."
            text="The site makes it clear that the bracelet is collected in NYC rather than shipped to customers."
          />
          <InfoPanel
            eyebrow="Tickets"
            title="Checkout happens externally."
            text="The CTA points to the ticketing platform, keeping the website focused on discovery and conversion."
          />
        </div>
      </section>

      <section id="partners" className="section-shell">
        <div className="flag-band grid gap-6 rounded-2xl p-6 text-white md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div>
            <p className="text-sm font-black uppercase text-white/75">Sponsors / Partners</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-5xl">Become a sponsor</h2>
            <p className="mt-4 max-w-2xl font-semibold leading-7 text-white">
              The layout reserves space for partners, community organizations, and local businesses that want to reach
              World Cup visitors.
            </p>
          </div>
          <div className="grid gap-2">
            {partnerTypes.map((type) => (
              <div key={type} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-black text-us-blue">
                <CheckCircle2 className="h-4 w-4 text-us-red" aria-hidden="true" />
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="bg-white">
        <div className="section-shell grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Email signup"
            title="Collect leads before launch."
            text="The form supports simple validation and a success state without extra backend plumbing."
          />
          <form className="grid gap-4 rounded-2xl border border-us-blue/10 bg-us-cream p-5 shadow-card md:p-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-extrabold text-us-blue">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={status === "error"}
                className="h-12 w-full rounded-md border border-us-blue/20 bg-white px-4 text-base text-us-navy placeholder:text-us-navy/40 focus:outline-none focus:ring-2 focus:ring-us-red"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <label htmlFor="language" className="mb-2 block text-sm font-extrabold text-us-blue">Language</label>
                <select
                  id="language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="h-12 w-full appearance-none rounded-md border border-us-blue/20 bg-white px-4 text-base text-us-navy focus:outline-none focus:ring-2 focus:ring-us-red"
                >
                  <option>English</option>
                  <option>Portuguese</option>
                  <option>Spanish</option>
                </select>
                <ChevronDown className="pointer-events-none absolute bottom-3.5 right-3 h-5 w-5 text-us-blue/60" aria-hidden="true" />
              </div>

              <div>
                <label htmlFor="window" className="mb-2 block text-sm font-extrabold text-us-blue">Visit dates</label>
                <input
                  id="window"
                  type="text"
                  placeholder="June 20 - June 27"
                  value={travelStart && travelEnd ? `${travelStart} to ${travelEnd}` : ""}
                  onChange={() => undefined}
                  className="h-12 w-full rounded-md border border-us-blue/20 bg-white px-4 text-base text-us-navy placeholder:text-us-navy/40 focus:outline-none focus:ring-2 focus:ring-us-red"
                />
                <p className="mt-2 text-xs font-semibold text-us-navy/50">Use the filter above to change the venue window.</p>
              </div>
            </div>

            <p className={status === "error" ? "text-sm font-bold text-red-700" : "text-sm font-bold text-us-navy/60"} aria-live="polite">
              {signupMessage}
            </p>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-us-blue px-6 text-base font-extrabold text-white transition hover:bg-us-navy"
            >
              <Languages className="h-5 w-5" aria-hidden="true" />
              Get early access
            </button>
          </form>
        </div>
      </section>

      <section id="faq" className="section-shell">
        <SectionHeading eyebrow="FAQ" title="Quick answers for first-time visitors." />
        <div className="grid gap-3">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-us-blue/10 bg-white p-5 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-extrabold text-us-blue">
                <span>{item.question}</span>
                <Megaphone className="h-5 w-5 shrink-0 text-us-red transition group-open:rotate-12" aria-hidden="true" />
              </summary>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-us-navy/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-us-blue/10 bg-us-cream px-5 py-8 text-center text-sm font-semibold text-us-navy/60">
        <p>NYCUP26 GAME PASS is an independent visitor pass concept and is not an official FIFA website.</p>
      </footer>
    </main>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white p-4 text-us-navy shadow-card">
      <Icon className="h-5 w-5 text-us-red" aria-hidden="true" />
      <p className="mt-3 text-xs font-black uppercase text-us-navy/60">{label}</p>
      <p className="mt-1 text-sm font-black text-us-blue">{value}</p>
    </div>
  );
}

function TickerItems({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex min-w-max items-center" aria-hidden={ariaHidden}>
      {tickerItems.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-3 px-5 text-sm font-extrabold">
          {index % 3 === 0 ? (
            <Clock3 className="h-4 w-4 text-white" aria-hidden="true" />
          ) : index % 3 === 1 ? (
            <Ticket className="h-4 w-4 text-white" aria-hidden="true" />
          ) : (
            <Gift className="h-4 w-4 text-white" aria-hidden="true" />
          )}
          <span className="uppercase text-white">{item.label}</span>
          <span className="text-white">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase text-us-red">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-us-blue md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base font-semibold leading-7 text-us-navy/70">{text}</p> : null}
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-us-red" aria-hidden="true" />
      <div>
        <p className="text-xs font-black uppercase text-us-navy/50">{label}</p>
        <p className="text-sm font-extrabold text-us-blue">{value}</p>
      </div>
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-us-blue">
      <span>{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-md border border-us-blue/20 bg-white px-4 text-us-navy focus:outline-none focus:ring-2 focus:ring-us-red"
      />
    </label>
  );
}

function InfoPanel({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
      <p className="text-sm font-black uppercase text-white">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl leading-tight text-white">{title}</h2>
      <p className="mt-3 font-semibold leading-7 text-white/75">{text}</p>
    </div>
  );
}

export default App;
