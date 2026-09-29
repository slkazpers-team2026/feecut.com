interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

interface SoftwareApplicationJsonLd {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'SoftwareApplication';
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly applicationCategory: 'FinanceApplication' | 'UtilityApplication';
  readonly operatingSystem: string;
  readonly offers: ReadonlyArray<{
    readonly '@type': 'Offer';
    readonly price: string;
    readonly priceCurrency: string;
  }>;
  readonly aggregateRating: {
    readonly '@type': 'AggregateRating';
    readonly ratingValue: string;
    readonly ratingCount: string;
  };
  readonly featureList: ReadonlyArray<string>;
  readonly inLanguage: string;
  readonly publisher: {
    readonly '@type': 'Organization';
    readonly name: string;
    readonly url: string;
  };
}

interface FaqPageJsonLd {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'FAQPage';
  readonly mainEntity: ReadonlyArray<{
    readonly '@type': 'Question';
    readonly name: string;
    readonly acceptedAnswer: {
      readonly '@type': 'Answer';
      readonly text: string;
    };
  }>;
}

interface WebPageJsonLd {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'WebPage';
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly publisher: {
    readonly '@type': 'Organization';
    readonly name: string;
    readonly url: string;
  };
}

export type JsonLdObject =
  | SoftwareApplicationJsonLd
  | FaqPageJsonLd
  | WebPageJsonLd;

const DEFAULT_SITE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) ||
  'https://feecut.com';

export const buildSoftwareApplicationJsonLd = (
  options: {
    readonly siteUrl?: string;
    readonly name?: string;
    readonly description?: string;
  } = {},
): SoftwareApplicationJsonLd => {
  const siteUrl = options.siteUrl ?? DEFAULT_SITE_URL;
  const name = options.name ?? 'FeeCut';
  const description =
    options.description ??
    'Ultra-fast, high-precision fee calculator and comparison tool for Stripe, PayPal, and Wise payments. Forward and reverse invoicing modes for domestic and international transactions.';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: siteUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1200',
    },
    featureList: [
      'Stripe fee calculator (domestic and international)',
      'PayPal fee calculator (domestic and cross-border)',
      'Wise transfer fee comparison',
      'Reverse calculation: invoice for exact net payout',
      'Side-by-side provider comparison',
      'Best payout highlighting',
      'Detailed percentage plus fixed-fee breakdowns',
    ],
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'FeeCut',
      url: siteUrl,
    },
  };
};

export const buildFaqPageJsonLd = (
  faqs: ReadonlyArray<FaqEntry> | Array<{ question: string; answer: string }> = [],
): FaqPageJsonLd => {
  const safeFaqs = Array.isArray(faqs) ? faqs : [];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: safeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const buildWebPageJsonLd = (
  options: {
    readonly siteUrl?: string;
    readonly name?: string;
    readonly description?: string;
    readonly path?: string;
  } = {},
): WebPageJsonLd => {
  const siteUrl = options.siteUrl ?? DEFAULT_SITE_URL;
  const path = options.path ?? '/';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name ?? 'FeeCut · Stripe vs PayPal vs Wise Fee Calculator',
    description:
      options.description ??
      'Compare Stripe, PayPal, and Wise payment fees side by side. Standard and reverse invoicing modes for domestic and international payouts.',
    url: `${siteUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`,
    publisher: {
      '@type': 'Organization',
      name: 'FeeCut',
      url: siteUrl,
    },
  };
};

export const jsonLdScriptProps = <T extends JsonLdObject>(
  data: T,
): {
  readonly type: 'application/ld+json';
  readonly dangerouslySetInnerHTML: { readonly __html: string };
} => ({
  type: 'application/ld+json',
  dangerouslySetInnerHTML: {
    __html: JSON.stringify(data),
  },
});
