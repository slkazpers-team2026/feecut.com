'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Globe, Calculator, HelpCircle } from 'lucide-react';

interface GuideSection {
  readonly id: string;
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly kicker: string;
  readonly paragraphs: ReadonlyArray<string>;
}

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

const GUIDES: ReadonlyArray<GuideSection> = [
  {
    id: 'gateway-fees-2026',
    icon: <FileText className="h-5 w-5" />,
    kicker: 'Deep Dive · 2026 Benchmarks',
    title: 'Understanding Payment Gateway Fees in 2026: Stripe vs. PayPal vs. Wise',
    paragraphs: [
      'Every dollar you earn through an online payment passes through at least one intermediary, and each one takes a cut. The trick is knowing who takes how much, and when a different provider can save you enough to matter. In 2026, the three household names for freelancers and SMBs remain Stripe, PayPal, and Wise — each with a distinct fee profile that rewards a specific kind of transaction.',
      'Stripe and PayPal follow the classic "interchange plus" blended pricing model that card networks invented: a percentage on every dollar plus a fixed per-transaction fee. For US domestic cards, both hover around 2.9% plus roughly $0.30–$0.49 per charge. Where they diverge is international volume. Stripe adds a flat 1.5% surcharge for cards issued outside the US, landing you at 4.40% + $0.30. PayPal takes the cross-border markup even further, adding 1.5% on top of its domestic schedule to reach 4.49% + $0.49 — a spread that sounds small until you multiply it across five- or six-figure annual invoicing.',
      'Wise, by contrast, does not route through card networks at all for its standard payout flow. It charges a transparent margin close to 0.45% plus a $0.50 transfer fee, which makes it dramatically cheaper for large invoices, especially cross-border ones. The trade-off, of course, is that Wise is a push-to-bank product, not a card-acquiring product. Your client has to initiate a Wise transfer, whereas Stripe and PayPal let you charge a card on file with one click.',
      'The right choice is almost never a single provider. Most operators keep Stripe or PayPal for card-ready clients and offer Wise as a discounted wire alternative for invoices above $1,000. FeeCut shows you both options side by side in real time so you can quote the cheapest path to your client without doing arithmetic by hand.',
    ],
  },
  {
    id: 'cross-border-markups',
    icon: <Globe className="h-5 w-5" />,
    kicker: 'Freelancer Economics',
    title: 'How Cross-Border and Currency Conversion Markups Eat Into Freelance Payouts',
    paragraphs: [
      'Freelancers and digital agencies that serve international clients lose an average of 3–7% of every invoice to invisible currency markup — a cost that almost never shows up on the line-item invoice from their payment provider. The fee is buried in the "spot rate" that PayPal, Stripe, and Wise present as the "conversion rate" on the day of the transfer.',
      'Stripe and PayPal typically embed a 1.5–3.9% spread into the mid-market rate before the transfer even clears. Wise was built explicitly to undercut this behavior and charges a fraction of a percent above the true Reuters mid-market rate, which is why it consistently shows the highest net payout in FeeCut comparisons for cross-border work above a couple thousand dollars.',
      'But raw conversion spread is not the whole story. Receiving in a foreign currency into a USD-denominated Stripe or PayPal balance, then converting manually on your own schedule, will usually beat automatic point-of-sale conversion because you can pick a better market day and because you can sometimes batch multiple small invoices into one larger conversion, minimizing the fixed-fee impact. FeeCut defaults to showing the per-transaction cost as billed so you can see the worst-case scenario before you decide to batch.',
      'The single highest-leverage move you can make this quarter is to open a Wise multi-currency account, enable local account details in USD, GBP, EUR, and AUD, and then quote every overseas client a choice between paying your Stripe checkout (for the convenience of a card) or sending a local transfer to your Wise details (for a 0.45% fee). The net revenue difference will pay for the 15 minutes of admin work within your first invoice.',
    ],
  },
  {
    id: 'reverse-invoicing-math',
    icon: <Calculator className="h-5 w-5" />,
    kicker: 'Billing Playbook',
    title: 'The Reverse Invoicing Math: How to Never Underbill Again',
    paragraphs: [
      'Here is the most expensive arithmetic mistake in freelance billing: "My rate is $100 an hour and the project is 40 hours, so I will invoice $4,000 and assume I will see about $3,850 after fees." That assumption is wrong, and it costs most solo operators somewhere between $500 and $5,000 a year in missed revenue. The correct question is not "what will 3% of $4,000 cost me?" It is "what number do I need to put on the invoice so that after Stripe takes 2.9% plus 30 cents, exactly $4,000 lands in my bank account?"',
      'That formula is the reverse calculation in FeeCut, and it is derived from a simple rearrangement of the standard fee equation. If fee = (amount × rate) + fixed, then net = amount − fee. To solve for the invoice amount that delivers exactly your target net, you need amount = (net + fixed) ÷ (1 − rate). Because of the fixed-fee term, the percentage you "lose" is never exactly the headline rate — it is always slightly higher for small invoices and asymptotically approaches the headline rate as the invoice grows large.',
      'The reverse mode in FeeCut runs that formula for all three providers simultaneously and tells you exactly what to write on the invoice for each. If you bill 10 clients a month and forget to pad for fees on each one, the shortfall compounds. At an average invoice of $2,500 with a blended 3% fee, that is roughly $900 a year left on the table — money you earned, quoted, and then quietly donated to the payment rails because you did not want to ask a client for an extra $75.',
      'Run FeeCut in reverse before you send every invoice. Round the result up to a clean round number ($3,100 instead of $3,092.18) and tell the client that the invoice is structured so your final deposit matches the quote. Clients respect the transparency, and your P&L will thank you for the discipline.',
    ],
  },
];

const FAQS: ReadonlyArray<FaqItem> = [
  {
    question: 'Which is cheaper for international clients: Stripe, PayPal, or Wise?',
    answer:
      'For most invoices over roughly $500, Wise is materially cheaper than Stripe or PayPal on international payouts. Wise charges around 0.45% + $0.50 with near-wholesale currency conversion, compared to Stripe International at 4.40% + $0.30 and PayPal International at 4.49% + $0.49, both of which also embed conversion spreads. The gap narrows for very small tickets where the flat $0.50 Wise transfer fee is a larger share of the total. Use FeeCut to compare your exact amount.',
  },
  {
    question: 'Does Stripe charge fees on refunds and chargebacks?',
    answer:
      'Stripe returns its percentage fee when you issue a full refund, but the fixed $0.30 per-transaction fee is almost always non-refundable in the US. Disputed chargebacks incur a separate $15 fee per incident in addition to the original amount being reversed if you lose the dispute. PayPal has a similar policy on refunds and chargebacks. Wise does not support card-style chargebacks in the traditional sense because it is a bank-to-bank push, which is one reason its fee base is so much lower.',
  },
  {
    question: 'How does Wise compare to standard merchant processors?',
    answer:
      'Wise is not a merchant acquirer — it cannot charge a stored card, handle 3D Secure, or process one-click checkout. It is a payout rail: your client manually initiates a transfer to your local Wise account details in their own currency, and the money arrives converted at a near-wholesale rate. For invoices you send, it is dramatically cheaper than a merchant processor. For recurring SaaS-style billing, Stripe or PayPal is the better fit because the card-on-file automation saves more in internal friction than the fee difference on a per-charge basis.',
  },
  {
    question: 'Should I pass payment-processing fees on to my client?',
    answer:
      'It depends on your pricing model and jurisdiction. In the US, Visa and Mastercard rules typically allow you to pass a "convenience fee" or "non-cash adjustment" up to the actual cost, as long as it is disclosed before the transaction and applied consistently. In the EU and UK, surcharging card transactions is restricted or prohibited under PSD2/BRR for most consumer cases. The safest universal play is to quote all-inclusive rates and use FeeCut\'s reverse mode to bake the correct fee cost into the headline invoice number so no surcharge appears at all.',
  },
  {
    question: 'How accurate are FeeCut\'s calculations compared to actual statements?',
    answer:
      'FeeCut implements the published public fee schedules for Stripe Standard US, PayPal Standard US, and the Wise average transfer margin as of 2026. Calculations match provider estimates to the cent for the standard cases they cover. Edge cases that can differ on a real statement include: premium card product surcharges (Amex, corporate cards), currency mid-market rate drift between calculation date and settlement date, volume-based custom pricing tiers, Connect/Mass Payout products, and regulatory taxes. Always verify with your provider contract — see our Terms of Service for the full financial disclaimer.',
  },
];

interface GuideCardProps {
  readonly guide: GuideSection;
}

const GuideCard = ({ guide }: GuideCardProps) => {
  return (
    <article className="rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-6 shadow-xl shadow-black/30 backdrop-blur">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          {guide.icon}
        </span>
        {guide.kicker}
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-neutral-100">
        {guide.title}
      </h3>
      <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-neutral-400">
        {guide.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

interface FaqCardProps {
  readonly faq: FaqItem;
  readonly open: boolean;
  readonly onToggle: () => void;
}

const FaqCard = ({ faq, open, onToggle }: FaqCardProps) => {
  return (
    <div
      className={[
        'rounded-2xl border transition',
        open
          ? 'border-neutral-700 bg-neutral-950/70 shadow-lg shadow-black/20'
          : 'border-neutral-800/80 bg-neutral-950/40 hover:border-neutral-700/80',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-neutral-400">
            <HelpCircle className="h-3.5 w-3.5" />
          </span>
          <h4 className="text-sm font-semibold text-neutral-100">{faq.question}</h4>
        </div>
        <span className="flex-none text-neutral-500">
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>
      {open && (
        <div className="border-t border-neutral-800/80 px-5 pb-5 pt-4">
          <p className="pl-9 text-sm leading-relaxed text-neutral-400">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export const ContentSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section className="w-full max-w-6xl mx-auto space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
          <span className="h-px flex-1 bg-neutral-800" />
          Guides & Analysis
          <span className="h-px flex-1 bg-neutral-800" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
            Know the fees before you send the invoice
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-500">
            FeeCut publishes practical breakdowns on how payment processors actually
            price your work, so you can stop subsidizing the rails on every payout.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {GUIDES.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-500">
            The questions freelancers and founders ask us most often before switching
            how they get paid.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {FAQS.map((faq, index) => (
            <FaqCard
              key={index}
              faq={faq}
              open={openFaqIndex === index}
              onToggle={() =>
                setOpenFaqIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { FAQS };

export default ContentSection;
