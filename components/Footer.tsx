import Link from 'next/link';
import { Scale, ShieldCheck, Mail, FileText, Info, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/80 bg-[#09090b]/80 pt-16 pb-12 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-neutral-800/80">
          {}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 font-bold text-white shadow-lg shadow-indigo-500/25 transition group-hover:scale-105">
                <Scale className="h-4.5 w-4.5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-neutral-100">
                Fee<span className="text-indigo-400">Cut</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              Free, privacy-first payment fee comparison tool for freelancers, contractors, and digital entrepreneurs. Compare Stripe, PayPal, and Wise domestic & international payout deductions instantly.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Client-Side Calculations · Zero Financial Data Stored</span>
            </div>
          </div>

          {}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Calculators
            </p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="transition hover:text-indigo-400">
                  Fee Comparison
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="transition hover:text-indigo-400">
                  Reverse Invoicing Mode
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition hover:text-indigo-400">
                  Gateway FAQs
                </Link>
              </li>
            </ul>
          </div>

          {}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Company
            </p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/about" className="inline-flex items-center gap-1.5 transition hover:text-indigo-400">
                  <Info className="h-3.5 w-3.5 text-neutral-500" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-flex items-center gap-1.5 transition hover:text-indigo-400">
                  <Mail className="h-3.5 w-3.5 text-neutral-500" />
                  Contact & Support
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@feecut.com"
                  className="inline-flex items-center gap-1 font-mono text-xs text-indigo-400 hover:text-indigo-300 transition"
                >
                  support@feecut.com
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Trust & Legal
            </p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/privacy-policy" className="inline-flex items-center gap-1.5 transition hover:text-indigo-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-neutral-500" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="inline-flex items-center gap-1.5 transition hover:text-indigo-400">
                  <FileText className="h-3.5 w-3.5 text-neutral-500" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {}
        <div className="mt-8 rounded-2xl border border-neutral-800/60 bg-neutral-950/60 p-5 text-xs leading-relaxed text-neutral-500">
          <p className="font-semibold text-neutral-400 mb-1">Financial Disclaimer & Trademark Notice</p>
          <p>
            FeeCut is an independent comparison tool and is not affiliated, endorsed, or sponsored by Stripe, Inc., PayPal Holdings, Inc., or Wise Payments Ltd. All registered trademarks, logos, and brand names are the property of their respective owners. Fee calculations provided are estimates based on standard publicly available pricing schedules for educational and planning purposes only. Actual transaction charges may differ based on your specific merchant tier, interchange classification, currency exchange spreads, and individual contract agreements. Always confirm final settlement fees with your payment processor before issuing customer invoices.
          </p>
        </div>

        {}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} FeeCut.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-neutral-400 transition">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-neutral-400 transition">
              Terms
            </Link>
            <Link href="/about" className="hover:text-neutral-400 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-neutral-400 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
