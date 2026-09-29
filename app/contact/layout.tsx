import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact · FeeCut',
  description:
    'Get in touch with the FeeCut team. Report fee calculation errors, request features, or send partnership inquiries. Support email: support@feecut.com.',
  alternates: {
    canonical: '/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
