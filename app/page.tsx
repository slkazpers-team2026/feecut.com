import Calculator from '@/components/Calculator';
import ContentSection from '@/components/ContentSection';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  TrendingDown,
  Scale,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  jsonLdScriptProps,
} from '@/lib/seo';

const FAQS = [
  {
    question: "Which payment gateway is best for international freelancers?",
    answer: "Wise generally provides the best payout rates due to mid-market exchange rates, while Stripe and PayPal charge additional 1.5% cross-border fees."
  },
  {
    question: "How does reverse fee calculation work?",
    answer: "Reverse calculation adds the processor percentage and flat fixed fees back to your desired amount so the client covers all transaction fees."
  },
  {
    question: "Does Stripe charge fixed fees on refunds?",
    answer: "No, Stripe does not return the original transaction processing fees when issuing refunds."
  }
];

export default function HomePage() {
  const appJsonLd = buildSoftwareApplicationJsonLd();
  const faqJsonLd = buildFaqPageJsonLd(FAQS);

  return (
    <>
      <script {...jsonLdScriptProps(appJsonLd)} />
      <script {...jsonLdScriptProps(faqJsonLd)} />

      <main className="min-h-screen bg-[#09090b] text-neutral-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Background glow effects */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/10 to-sky-500/10 blur-[130px] rounded-full" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 space-y-20">
          {/* Navigation / Header Brand */}
          <header className="mb-4 flex items-center justify-between border-b border-neutral-800/80 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 font-bold text-white shadow-lg shadow-indigo-500/25">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-neutral-100">
                  Fee<span className="text-indigo-400">Cut</span>
                </span>
                <span className="ml-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
                  v1.0
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-neutral-400">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-neutral-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live 2026 Rates
              </span>
            </div>
          </header>

          {/* Hero Title */}
          <div className="mx-auto max-w-3xl text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 mb-4 shadow-inner">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              Stop losing 3% to 5% silently on every client transaction
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-50 sm:text-5xl sm:leading-[1.15]">
              Know exactly what you keep. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">
                Stripe vs PayPal vs Wise
              </span>
            </h1>
            <p className="mt-4 text-base text-neutral-400 max-w-2xl mx-auto sm:text-lg">
              Compare gateway fees in real time. Use forward calculation to see your true net payout, or reverse calculation to pass processor fees to your client.
            </p>
          </div>

          {/* Main Calculator */}
          <Calculator />

          {/* Feature Highlights Grid */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-6 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 mb-4">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-neutral-200">Reverse Fee Calculation</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Need exactly $1,000 in your pocket? Reverse mode calculates the exact gross invoice figure so the client covers all processor deductions.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-6 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 mb-4">
                <TrendingDown className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-neutral-200">Domestic & Cross-Border Rates</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Compare 2.9% + $0.30 domestic vs 4.4% + $0.30 international charges instantly. Know the real cost before sending foreign invoices.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-6 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-neutral-200">100% Client-Side & Private</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                No server logging, no tracking, and no cookies. Copy structured summaries straight to clipboard to paste into invoices or proposals.
              </p>
            </div>
          </section>

          {/* SEO Editorial + FAQ */}
          <ContentSection />
        </div>
      </main>
    </>
  );
}
