import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'FeeCut — Payment Gateway Fee & Net Payout Calculator',
  description:
    'Compare real payment processing fees between Stripe, PayPal, and Wise. Calculate forward net payout or reverse invoice amount to pass fees to your client.',
  keywords: [
    'fee calculator',
    'stripe fees',
    'paypal fees',
    'wise transfer fees',
    'freelance invoice calculator',
    'merchant payment comparison',
  ],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.className}`}>
      <body className="min-h-screen bg-[#09090b] text-neutral-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
        <Footer />
      </body>
    </html>
  );
}
