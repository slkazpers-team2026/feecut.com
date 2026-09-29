import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ArrowLeft, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service · FeeCut',
  description:
    'FeeCut Terms of Service. Includes important financial disclaimer: all calculator outputs are estimates only and are not financial, tax, or legal advice.',
  alternates: {
    canonical: '/terms-of-service',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = 'September 28, 2026';

interface Section {
  readonly heading: string;
  readonly paragraphs: ReadonlyArray<string>;
  readonly bullets?: ReadonlyArray<string>;
  readonly isDisclaimer?: boolean;
}

const SECTIONS: ReadonlyArray<Section> = [
  {
    heading: 'Acceptance of terms',
    paragraphs: [
      'By accessing or using feecut.com (the "Site") and any tools, calculators, content, or services provided on or through the Site (collectively the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Services.',
      'These Terms are a legally binding agreement between you and FeeCut ("we", "us", "our"). We reserve the right to change these Terms at any time, effective upon posting the revised Terms on the Site with a new "Last updated" date.',
    ],
  },
  {
    heading: 'Description of the Services',
    paragraphs: [
      'FeeCut provides an online fee calculator and supporting editorial content to help individuals and businesses compare published fee schedules across payment processors including, but not limited to, Stripe, PayPal, and Wise.',
      'The Services are provided free of charge and supported by contextual advertising displayed on the Site.',
    ],
  },
  {
    heading: 'Financial disclaimer — calculations are estimates only',
    isDisclaimer: true,
    paragraphs: [
      'THE CALCULATOR TOOLS AND NUMERIC OUTPUTS ON THE SITE ARE PROVIDED FOR INFORMATIONAL AND ILLUSTRATIVE PURPOSES ONLY AND DO NOT CONSTITUTE FINANCIAL, TAX, LEGAL, OR ACCOUNTING ADVICE.',
    ],
    bullets: [
      'Calculations are derived from the publicly published standard fee schedules for the named payment processors as of the date shown on the relevant page. Your actual fees may differ materially from the figures displayed.',
      'Reasons your actual bill may differ include, but are not limited to: custom volume-based pricing tiers, premium card type surcharges (corporate cards, Amex, commercial cards), regulatory taxes and duties, refund and chargeback fees, Connect / Marketplace / Mass Payout product fees, 3D Secure and risk-friction charges, foreign exchange rate movement between calculation date and settlement date, geographic surcharges, and ACH or wire-specific pricing not shown in the card schedule.',
      'Always verify the final fee structure against your written merchant services agreement, invoice, and settlement records before making pricing, billing, or contract decisions.',
      'Users should independently confirm the current official fee schedules from Stripe, PayPal, or Wise before issuing customer invoices based on FeeCut outputs.',
    ],
  },
  {
    heading: 'No financial, tax, or legal advice',
    paragraphs: [
      'Nothing on the Site should be interpreted as recommending or endorsing a particular payment processor, product, or business decision. You are solely responsible for evaluating the suitability and cost of any provider you use.',
      'Consult a qualified financial adviser, accountant, or attorney before making any decisions with financial, tax, or legal consequences.',
    ],
  },
  {
    heading: 'Accuracy of content',
    paragraphs: [
      'We take reasonable steps to keep the calculator formulas and editorial content accurate and up to date. However, payment processors change their fee schedules, product lineups, and policies without notice, and we cannot guarantee that every figure displayed reflects the latest change.',
      'The Site may contain references to third-party trademarks, product names, and brand names. All third-party trademarks are the property of their respective owners. Unless explicitly stated, FeeCut is not affiliated with, endorsed by, or sponsored by Stripe, PayPal, Wise, or any other named provider.',
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: [
      'You agree not to use the Services to:',
    ],
    bullets: [
      'Violate any applicable law or regulation',
      'Upload, transmit, or distribute viruses, malware, or other harmful code',
      'Attempt to gain unauthorized access to our systems or networks',
      'Scrape, crawl, or reproduce the Services or their outputs for the purpose of operating a competing commercial service without our prior written consent',
      'Engage in any activity that interferes with or disrupts the normal operation of the Site',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'All content on the Site, including but not limited to text, graphics, logos, icons, calculator logic, page layout, and original code, is the property of FeeCut or its licensors and is protected by copyright, trademark, and other intellectual property laws.',
      'You may view, download, and print pages from the Site for your own personal, non-commercial use, subject to these Terms. Any other reproduction, distribution, modification, or commercial exploitation of the Site content requires prior written permission from FeeCut.',
    ],
  },
  {
    heading: 'External links and third-party services',
    paragraphs: [
      'The Site may contain hyperlinks to websites operated by third parties, including payment providers and advertising partners. We do not control, endorse, or accept responsibility for the content, privacy policies, or practices of any third-party websites.',
      'Your interactions with any third-party site, including purchases and payments, are governed solely by that third party\'s own terms and policies.',
    ],
  },
  {
    heading: 'Disclaimer of warranties',
    paragraphs: [
      'THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.',
      'We do not warrant that the Services will operate uninterrupted, error-free, secure, or free of viruses or other harmful components.',
    ],
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FEECUT, ITS OWNERS, OFFICERS, EMPLOYEES, AFFILIATES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICES.',
      'IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATING TO THE SERVICES EXCEED THE AMOUNT, IF ANY, ACTUALLY PAID BY YOU TO FEECUT FOR ACCESS TO THE SERVICES IN THE TWELVE (12) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE CLAIM.',
    ],
  },
  {
    heading: 'Indemnification',
    paragraphs: [
      'You agree to defend, indemnify, and hold harmless FeeCut and its officers, directors, employees, agents, licensors, and service providers from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys\' fees) arising out of or in connection with your access to or use of the Services, your violation of these Terms, or your violation of any rights of another party.',
    ],
  },
  {
    heading: 'Governing law and dispute resolution',
    paragraphs: [
      'These Terms and any dispute arising out of or relating to them or the Services shall be governed by and construed in accordance with the laws of the jurisdiction under which FeeCut operates, without regard to its conflict-of-law rules.',
      'Any dispute, claim, or controversy arising out of or relating to these Terms shall be resolved through good-faith negotiation; if that fails, the parties agree to submit to the exclusive jurisdiction of the courts located in that same jurisdiction.',
    ],
  },
  {
    heading: 'Severability and entire agreement',
    paragraphs: [
      'If any provision of these Terms is held invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect.',
      'These Terms, together with the Privacy Policy, constitute the entire agreement between you and FeeCut regarding your use of the Services and supersede all prior or contemporaneous communications, proposals, or agreements, whether oral or written, between the parties.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      'Questions about these Terms may be directed to legal@feecut.com.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-12 text-neutral-200 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-amber-600/8 via-indigo-600/5 to-transparent blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl space-y-10">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-indigo-400 transition group"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Back to Calculator
        </Link>

        <header className="space-y-4 border-b border-neutral-800 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-amber-400">
            <Scale className="h-3.5 w-3.5" />
            Terms of Service
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
            Important: FeeCut numbers are estimates, not quotes.
          </h1>
          <p className="text-sm text-neutral-500">
            Last updated {LAST_UPDATED} · Please read the financial disclaimer
            carefully before relying on any calculator output for invoicing or
            pricing decisions.
          </p>
        </header>

        {/* Prominent disclaimer callout */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 px-5 py-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-200/80 leading-relaxed">
            <p className="font-semibold text-amber-300 mb-1">Key Takeaway</p>
            <p>
              All fee figures shown on FeeCut are estimates for informational
              purposes only. You should always verify the current official
              gateway fee schedules from your payment processor before issuing
              invoices to clients.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section
              key={section.heading}
              className={`space-y-3 ${
                section.isDisclaimer
                  ? 'rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-6'
                  : ''
              }`}
            >
              <h2 className="text-lg font-semibold text-neutral-100">
                {section.heading}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-neutral-400">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2 pl-5">
                    {section.bullets.map((bullet, index) => (
                      <li key={index} className="list-disc marker:text-neutral-600">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
