import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy · FeeCut',
  description:
    'How FeeCut collects, uses, and protects information. We never store card numbers or financial account credentials. Discloses Google AdSense cookies and DoubleClick DART cookies.',
  alternates: {
    canonical: '/privacy-policy',
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
}

const SECTIONS: ReadonlyArray<Section> = [
  {
    heading: 'Who we are',
    paragraphs: [
      'FeeCut (the "Site", "we", "us") operates feecut.com and related web properties. We build free calculator tools and editorial content for freelancers, independent contractors, and small businesses evaluating payment gateway pricing.',
      'If you have questions about this policy, email privacy@feecut.com and we will respond within a reasonable window.',
    ],
  },
  {
    heading: 'Information we do NOT collect',
    paragraphs: [
      'FeeCut is a client-side calculator first and foremost. We do not collect, store, transmit, or process any of the following through our calculator interface:',
    ],
    bullets: [
      'Credit card numbers or debit card numbers',
      'CVV / CSC security codes',
      'Bank account numbers, routing numbers, or wire instructions',
      'Any personally identifiable financial account credentials',
      'Invoice values, payout amounts, or provider selections',
    ],
  },
  {
    heading: 'Log files',
    paragraphs: [
      'FeeCut follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services\' analytics.',
      'The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users\' movement on the website, and gathering demographic information.',
    ],
  },
  {
    heading: 'Cookies and web beacons',
    paragraphs: [
      'Like many websites, FeeCut uses "cookies." These cookies are used to store information including visitors\' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users\' experience by customizing our web page content based on visitors\' browser type and/or other information.',
      'We may use cookies to remember your calculator preferences between sessions (so your last-used amount and region do not reset on reload).',
    ],
  },
  {
    heading: 'Google DoubleClick DART Cookie',
    paragraphs: [
      'Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to feecut.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL:',
      'https://policies.google.com/technologies/ads',
    ],
  },
  {
    heading: 'Google AdSense and third-party ad vendors',
    paragraphs: [
      'This Site participates in the Google AdSense advertising program. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on FeeCut, which are sent directly to users\' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.',
      'Note that FeeCut has no access to or control over these cookies that are used by third-party advertisers.',
      'You may opt out of personalized advertising by visiting Google\'s Ads Settings at google.com/settings/ads. You can also opt out of a third-party vendor\'s use of cookies for personalized advertising by visiting the Digital Advertising Alliance opt-out page at aboutads.info or the Network Advertising Initiative opt-out page at optout.networkadvertising.org.',
    ],
  },
  {
    heading: 'How we use information',
    paragraphs: [
      'Any limited personal data we receive is used to:',
    ],
    bullets: [
      'Operate, maintain, and improve the Site',
      'Detect, investigate, and prevent fraudulent or abusive traffic',
      'Respond to your support or partnership inquiries',
      'Comply with applicable law, court orders, or enforceable governmental requests',
      'Protect our rights, privacy, safety, or property',
    ],
  },
  {
    heading: 'Third-party privacy policies',
    paragraphs: [
      'FeeCut\'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.',
      'You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers\' respective websites.',
    ],
  },
  {
    heading: 'Data retention',
    paragraphs: [
      'Server log and analytics data is retained for a rolling period consistent with our hosting provider\'s standard data lifecycle, typically between 30 and 180 days. Support correspondence is retained for as long as reasonably necessary to satisfy the purpose of the communication and satisfy record-keeping obligations.',
      'If you would like us to delete a copy of a support message you previously sent, reply to the original thread with a deletion request and we will remove it from our inbox and archives where technically feasible.',
    ],
  },
  {
    heading: 'CCPA privacy rights (Do Not Sell My Personal Information)',
    paragraphs: [
      'Under the CCPA, among other rights, California consumers have the right to:',
    ],
    bullets: [
      'Request that a business that collects a consumer\'s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.',
      'Request that a business delete any personal data about the consumer that a business has collected.',
      'Request that a business that sells a consumer\'s personal data, not sell the consumer\'s personal data.',
    ],
  },
  {
    heading: 'GDPR data protection rights',
    paragraphs: [
      'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:',
    ],
    bullets: [
      'The right to access — You have the right to request copies of your personal data.',
      'The right to rectification — You have the right to request that we correct any information you believe is inaccurate.',
      'The right to erasure — You have the right to request that we erase your personal data, under certain conditions.',
      'The right to restrict processing — You have the right to request that we restrict the processing of your personal data, under certain conditions.',
      'The right to object to processing — You have the right to object to our processing of your personal data, under certain conditions.',
      'The right to data portability — You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
    ],
  },
  {
    heading: 'Children\'s information',
    paragraphs: [
      'Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.',
      'FeeCut does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.',
    ],
  },
  {
    heading: 'Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we do, we will revise the "Last updated" date at the top of this page and, where the changes are material, provide a more prominent notice on the Site.',
      'Your continued use of the Site after an updated policy takes effect constitutes your acceptance of the revised terms.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      'Questions, concerns, or requests regarding this Privacy Policy or our data practices should be directed to privacy@feecut.com.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-12 text-neutral-200 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-emerald-600/10 via-indigo-600/5 to-transparent blur-[130px] rounded-full" />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400">
            <Shield className="h-3.5 w-3.5" />
            Privacy Policy
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
            We do not collect your financial data. Ever.
          </h1>
          <p className="text-sm text-neutral-500">
            Last updated {LAST_UPDATED} · This policy describes what FeeCut
            collects, what we explicitly never touch, and how Google AdSense
            cookies and DoubleClick DART cookies operate on this site.
          </p>
        </header>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.heading} className="space-y-3">
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

        {/* Consent notice */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-emerald-300/80">
          <p className="font-semibold text-emerald-300 mb-1">Consent</p>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
        </div>
      </div>
    </main>
  );
}
