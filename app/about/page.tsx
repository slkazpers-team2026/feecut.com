import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Target,
  Users,
  Zap,
  ArrowLeft,
  Globe,
  ShieldCheck,
  Code2,
  Cpu,
  Lock,
  Server,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About · FeeCut',
  description:
    'FeeCut is an independent fee calculator helping freelancers and small businesses keep more of every invoice. Compare Stripe, PayPal, and Wise in one place.',
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface Pillar {
  readonly icon: React.ReactNode;
  readonly heading: string;
  readonly body: string;
}

interface TechItem {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly detail: string;
}

const PILLARS: ReadonlyArray<Pillar> = [
  {
    icon: <Target className="h-5 w-5" />,
    heading: 'Transparency, always.',
    body: 'Every formula in FeeCut is explicit, based on the public fee schedules for Stripe, PayPal, and Wise. No black boxes, no fudge factors, no rounding bias to favor a sponsor.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    heading: 'Built for the underserved.',
    body: 'Solo operators and small teams pay the same percentage fees as billion-dollar SaaS companies, but without the pricing team to shop for custom rates. FeeCut closes that gap.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    heading: 'Fast, local, private math.',
    body: 'The calculator runs entirely in your browser. Your invoice values never hit our servers. We publish the formulas so you can audit them against your own spreadsheet any time.',
  },
];

const TECH_STACK: ReadonlyArray<TechItem> = [
  {
    icon: <Cpu className="h-5 w-5" />,
    label: 'Client-Side Only',
    detail:
      'All fee calculations execute in your browser using JavaScript. No API calls, no backend processing, no database writes. Your financial numbers stay on your machine.',
  },
  {
    icon: <Lock className="h-5 w-5" />,
    label: 'Zero Tracking by Default',
    detail:
      'FeeCut ships with no analytics SDK, no pixel trackers, and no fingerprinting. The only cookies on the site come from Google AdSense for advertising. We cannot see what you type into the calculator.',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    label: 'Modern Stack, Instant Load',
    detail:
      'Built with Next.js and React for server-side rendered pages that load instantly. Tailwind CSS for a clean, responsive design system. TypeScript throughout for formula correctness.',
  },
  {
    icon: <Server className="h-5 w-5" />,
    label: 'Edge-Deployed',
    detail:
      'Static pages are pre-rendered and deployed to a global edge CDN, ensuring sub-second load times for users worldwide. No origin server round-trip needed for page views.',
  },
];

const STORY_PARAGRAPHS: ReadonlyArray<string> = [
  'FeeCut started as a spreadsheet shared between a handful of freelance designers and developers who were tired of seeing $30 to $150 silently disappear from every international invoice. The math was always the same: "how much do I actually need to charge so my bank deposit matches the number I quoted?" — and nobody wanted to do that algebra before coffee.',
  'That spreadsheet eventually became FeeCut: a free, independent, advertising-supported site that compares the three most common payout rails (Stripe, PayPal, and Wise) side by side, in both directions — either "what do I net if I invoice X" or "what number do I put on the invoice so I see exactly Y in my account".',
  'We are independent. FeeCut is not owned by, partnered with, or controlled by Stripe, PayPal, Wise, or any other payment processor. We do not take referral commissions when you click a provider link, and we never adjust our formulas to make one provider look better than another in order to collect a bounty.',
  'If FeeCut saves you a single awkward "sorry, I forgot to account for fees" re-invoice, or a single Wise transfer that beats a card charge by $60, the project is doing what we built it to do.',
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-12 text-neutral-200 sm:px-6 lg:px-8">
      {}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-600/10 via-violet-600/5 to-transparent blur-[130px] rounded-full" />
        <div className="absolute top-[60%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-14">
        {}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-indigo-400 transition group"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Back to Calculator
        </Link>

        {}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            About FeeCut
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-neutral-50 sm:text-5xl">
            Helping freelancers keep more of every invoice they send.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-400">
            FeeCut is an independent, advertising-supported fee calculator
            built for the people and teams who actually do the work — not the
            payment rails that sit between them and their money.
          </p>
        </header>

        {}
        <section className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.heading}
              className="rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:border-neutral-700/60 hover:bg-neutral-950/60"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                {pillar.icon}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-neutral-100">
                {pillar.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {pillar.body}
              </p>
            </div>
          ))}
        </section>

        {}
        <section className="space-y-6 border-y border-neutral-800 py-10">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-100">
            Our story
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-neutral-400">
            {STORY_PARAGRAPHS.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-indigo-400">
              <Globe className="h-3.5 w-3.5" />
              Tech Stack Transparency
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-100">
              Built for speed. Engineered for privacy.
            </h2>
            <p className="mx-auto max-w-xl text-sm text-neutral-400">
              We believe you have a right to know how the tool you&apos;re using
              is built and where your data goes (spoiler: nowhere).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {TECH_STACK.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-5 shadow-lg shadow-black/20 backdrop-blur transition hover:border-neutral-700/60"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  {item.icon}
                </div>
                <h3 className="mt-3 text-base font-semibold text-neutral-100">
                  {item.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-100">
            What FeeCut is not
          </h2>
          <ul className="space-y-3 text-sm leading-relaxed text-neutral-400">
            <li className="flex gap-3 items-start">
              <ShieldCheck className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                We are not a payment processor, a bank, or a money transmitter.
                We never hold your funds and we never see your card or bank
                numbers.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <ShieldCheck className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                We do not provide financial, tax, or legal advice. Our output
                numbers are estimates based on public fee schedules; your
                provider&apos;s final invoice will always be the authoritative one.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <ShieldCheck className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                We do not sell paid placements. Stripe, PayPal, and Wise appear
                side by side because our users use all three, not because any of
                them paid to be on the page.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
