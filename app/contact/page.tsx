'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Send,
  Check,
  User,
  ArrowLeft,
  ArrowUpRight,
  HelpCircle,
  MessageSquare,
  Clock,
  ShieldCheck,
  FileText,
} from 'lucide-react';

type SubmissionState = 'idle' | 'sending' | 'sent';

interface FormState {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: 'General inquiry',
  message: '',
};

const EMAIL_OPTIONS: ReadonlyArray<{
  readonly label: string;
  readonly value: string;
}> = [
  { label: 'General inquiry', value: 'General inquiry' },
  { label: 'Partnership & press', value: 'Partnership & press' },
  { label: 'Bug report or correction', value: 'Bug report or correction' },
  { label: 'Content suggestion', value: 'Content suggestion' },
  { label: 'Privacy or legal request', value: 'Privacy or legal request' },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [state, setState] = useState<SubmissionState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length === 0) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10)
      next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || state !== 'idle') return;

    setState('sending');
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setState('sent');
    setForm(INITIAL_FORM);
  };

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-12 text-neutral-200 sm:px-6 lg:px-8">
      {}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-sky-600/10 via-indigo-600/5 to-transparent blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-12">
        {}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-indigo-400 transition group"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Back to Calculator
        </Link>

        {}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-sky-400">
            <Mail className="h-3.5 w-3.5" />
            Contact
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-50 sm:text-5xl">
            Drop us a line.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-400">
            Questions, corrections, partnership inquiries, or just want to say
            hi? We read every message that lands in the inbox.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-neutral-800/80 bg-neutral-950/40 p-6 shadow-xl shadow-black/30 backdrop-blur sm:p-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-sky-400" />
              <h2 className="text-lg font-semibold text-neutral-100">
                Send us feedback
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400"
                >
                  <User className="h-3.5 w-3.5" />
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none ring-1 ring-transparent transition focus:border-indigo-500/60 focus:ring-indigo-500/30 aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:ring-red-500/30"
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none ring-1 ring-transparent transition focus:border-indigo-500/60 focus:ring-indigo-500/30 aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:ring-red-500/30"
                  placeholder="jane@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {}
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400"
              >
                Subject
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-neutral-100 outline-none ring-1 ring-transparent transition focus:border-indigo-500/60 focus:ring-indigo-500/30 appearance-none cursor-pointer"
              >
                {EMAIL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Your message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none ring-1 ring-transparent transition resize-none focus:border-indigo-500/60 focus:ring-indigo-500/30 aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:ring-red-500/30"
                placeholder="Tell us what's on your mind — fee corrections, feature requests, kind words, or anything else…"
              />
              {errors.message && (
                <p className="text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            {}
            <button
              type="submit"
              disabled={state !== 'idle'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-violet-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'sent' ? (
                <>
                  <Check className="h-4 w-4 text-emerald-200" />
                  Message sent — we&apos;ll reply soon
                </>
              ) : state === 'sending' ? (
                <>
                  <Send className="h-4 w-4 animate-pulse" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>

            {state === 'sent' && (
              <p className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
                Thanks for reaching out. Your message has been queued and
                someone on the team will get back to you at the email you
                provided.
              </p>
            )}
          </form>

          {}
          <aside className="space-y-4">
            {}
            <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/40 p-6 shadow-xl shadow-black/30 backdrop-blur">
              <h2 className="text-lg font-semibold text-neutral-100">
                Prefer email?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                For fastest service, email us directly instead of the form.
                Most messages get a reply within one business day.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href="mailto:support@feecut.com"
                  className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-neutral-100 transition hover:border-neutral-700 hover:bg-neutral-900"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-neutral-400" />
                    Support
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    support@feecut.com
                  </span>
                </a>
                <a
                  href="mailto:hello@feecut.com"
                  className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-neutral-100 transition hover:border-neutral-700 hover:bg-neutral-900"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-neutral-400" />
                    General inquiries
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    hello@feecut.com
                  </span>
                </a>
                <a
                  href="mailto:privacy@feecut.com"
                  className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-neutral-100 transition hover:border-neutral-700 hover:bg-neutral-900"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-neutral-400" />
                    Privacy requests
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    privacy@feecut.com
                  </span>
                </a>
              </div>
            </div>

            {}
            <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/40 p-6 shadow-xl shadow-black/30 backdrop-blur">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="h-5 w-5 text-indigo-400" />
                <h2 className="text-base font-semibold text-neutral-100">
                  Quick links
                </h2>
              </div>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                <li>
                  <Link
                    href="/#faq"
                    className="inline-flex items-center gap-2 transition hover:text-indigo-400"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-neutral-500" />
                    Gateway Fee FAQs
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="inline-flex items-center gap-2 transition hover:text-indigo-400"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-neutral-500" />
                    Privacy Policy
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="inline-flex items-center gap-2 transition hover:text-indigo-400"
                  >
                    <FileText className="h-3.5 w-3.5 text-neutral-500" />
                    Terms of Service
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 transition hover:text-indigo-400"
                  >
                    <User className="h-3.5 w-3.5 text-neutral-500" />
                    About FeeCut
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {}
            <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/40 p-6 shadow-xl shadow-black/30 backdrop-blur">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-neutral-500" />
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Response times
                </p>
              </div>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-start justify-between gap-3">
                  <span>General questions</span>
                  <span className="text-neutral-300">1–2 business days</span>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <span>Bug reports</span>
                  <span className="text-neutral-300">Same business day</span>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <span>Legal / privacy requests</span>
                  <span className="text-neutral-300">3–5 business days</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
