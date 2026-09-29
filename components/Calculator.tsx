'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  Globe,
  DollarSign,
  Info,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  calculateAllProviders,
  formatCurrency,
  formatPercentage,
  type CalculationMode,
  type CalculationResult,
  type RegionType,
} from '@/lib/calculator';

const QUICK_AMOUNTS: ReadonlyArray<number> = [100, 500, 1000, 2500, 5000];

const PROVIDER_META: Readonly<
  Record<
    CalculationResult['provider'],
    { readonly name: string; readonly accent: string; readonly ring: string }
  >
> = {
  stripe: {
    name: 'Stripe',
    accent: 'from-indigo-500/10 to-violet-500/10',
    ring: 'ring-indigo-400/40 border-indigo-400/40',
  },
  paypal: {
    name: 'PayPal',
    accent: 'from-sky-500/10 to-blue-500/10',
    ring: 'ring-sky-400/40 border-sky-400/40',
  },
  wise: {
    name: 'Wise',
    accent: 'from-emerald-500/10 to-teal-500/10',
    ring: 'ring-emerald-400/40 border-emerald-400/40',
  },
};

type CopyState = 'idle' | 'copied';

interface ProviderCardProps {
  readonly result: CalculationResult;
  readonly isBest: boolean;
  readonly expanded: boolean;
  readonly onToggleExpand: () => void;
}

const ProviderCard = ({
  result,
  isBest,
  expanded,
  onToggleExpand,
}: ProviderCardProps) => {
  const meta = PROVIDER_META[result.provider];
  const isReverse = result.mode === 'reverse';

  return (
    <div
      className={[
        'relative flex flex-col rounded-2xl border bg-gradient-to-b p-5 transition-all duration-200',
        'bg-neutral-950/60 backdrop-blur',
        isBest
          ? `border-2 ${meta.ring} ring-2 shadow-xl shadow-black/20`
          : 'border-neutral-800/80',
        meta.accent,
      ].join(' ')}
    >
      {isBest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1 text-[11px] font-semibold text-neutral-950 shadow-lg shadow-amber-500/20">
            <Sparkles className="h-3 w-3" />
            Best Payout
          </span>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-neutral-100">
              {meta.name}
            </h3>
            {isBest && (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            )}
          </div>
          <p className="mt-0.5 text-xs text-neutral-500">{result.config.label}</p>
        </div>
        {result.region && (
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-400">
            <Globe className="h-3 w-3" />
            {result.region}
          </span>
        )}
      </div>

      <div className="mt-5 space-y-1">
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          {isReverse ? 'You receive (target)' : 'Net payout'}
        </p>
        <p className="text-3xl font-bold tracking-tight text-neutral-50">
          {formatCurrency(result.netPayout)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-neutral-800/80 pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">
            {isReverse ? 'Invoice client' : 'Invoice amount'}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-neutral-200">
            {formatCurrency(result.invoiceAmount)}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">
            Gateway fee
          </p>
          <p className="mt-0.5 text-sm font-semibold text-rose-400">
            {isReverse ? '+' : '−'}
            {formatCurrency(result.feeBreakdown.totalFee)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/40 px-3 py-2">
        <span className="text-xs text-neutral-400">Percentage lost</span>
        <span className="text-sm font-semibold text-neutral-200">
          {formatPercentage(result.percentageLost)}
        </span>
      </div>

      <button
        type="button"
        onClick={onToggleExpand}
        className="mt-4 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-neutral-800/80 bg-neutral-900/40 px-3 py-2.5 text-left text-xs text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-900/80"
        aria-expanded={expanded}
      >
        <span className="inline-flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-neutral-500" />
          Detailed breakdown
        </span>
        {expanded ? (
          <ChevronUp className="h-3.5 w-3.5 text-neutral-500" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">
              Percentage fee ({formatPercentage(result.config.percentageRate * 100)})
            </span>
            <span className="font-medium text-neutral-200">
              {formatCurrency(result.feeBreakdown.percentagePortion)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Fixed flat fee</span>
            <span className="font-medium text-neutral-200">
              {formatCurrency(result.feeBreakdown.fixedPortion)}
            </span>
          </div>
          <div className="h-px bg-neutral-800" />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-200">Total fee</span>
            <span className="font-semibold text-rose-400">
              {formatCurrency(result.feeBreakdown.totalFee)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

interface ToggleButtonProps {
  readonly active: boolean;
  readonly onClick: () => void;
  readonly children: React.ReactNode;
}

const ToggleButton = ({ active, onClick, children }: ToggleButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'flex-1 rounded-lg px-3 py-2 text-xs font-medium transition',
      active
        ? 'bg-neutral-100 text-neutral-950 shadow-sm'
        : 'text-neutral-400 hover:text-neutral-200',
    ].join(' ')}
  >
    {children}
  </button>
);

export const Calculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [rawInput, setRawInput] = useState<string>('1,000');
  const [mode, setMode] = useState<CalculationMode>('forward');
  const [region, setRegion] = useState<RegionType>('domestic');
  const [expandedCard, setExpandedCard] = useState<CalculationResult['provider'] | null>(null);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const results = useMemo(
    () =>
      calculateAllProviders({
        amount,
        mode,
        region,
      }),
    [amount, mode, region],
  );

  const bestProvider = useMemo(() => {
    return results.reduce<CalculationResult | null>((best, current) => {
      if (!best) return current;
      return current.netPayout > best.netPayout ? current : best;
    }, null);
  }, [results]);

  const handleAmountChange = (value: string) => {
    setRawInput(value);
    const numeric = Number(value.replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(numeric) && numeric >= 0) {
      setAmount(Math.round(numeric * 100) / 100);
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount);
    setRawInput(quickAmount.toLocaleString('en-US'));
  };

  const buildSummary = (): string => {
    const transactionLabel =
      region === 'international' ? 'International' : 'US Domestic';
    const modeLabel =
      mode === 'forward'
        ? `Invoice ${formatCurrency(amount)}`
        : `Desired net ${formatCurrency(amount)}`;

    const lines = [
      `FeeCut · Payment Fee Comparison`,
      `${modeLabel} · ${transactionLabel}`,
      '',
    ];

    results
      .slice()
      .sort((a, b) => b.netPayout - a.netPayout)
      .forEach((r, idx) => {
        const meta = PROVIDER_META[r.provider];
        const marker = idx === 0 ? '★ ' : '  ';
        lines.push(
          `${marker}${meta.name.padEnd(7)} | Net: ${formatCurrency(r.netPayout).padEnd(12)} | Fee: ${formatCurrency(r.feeBreakdown.totalFee).padEnd(9)} (${formatPercentage(r.percentageLost)})`,
        );
      });

    lines.push('');
    lines.push('Generated with FeeCut.com');
    return lines.join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('idle');
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto">
      <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/40 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-7 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400"
              >
                <DollarSign className="h-3.5 w-3.5" />
                {mode === 'forward'
                  ? 'Invoice / Transfer Amount'
                  : 'Desired Net Amount (In Hand)'}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-semibold text-neutral-500">
                  $
                </span>
                <input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  value={rawInput}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 py-4 pl-9 pr-4 text-2xl font-semibold tracking-tight text-neutral-100 outline-none transition focus:border-neutral-600 focus:ring-2 focus:ring-neutral-700/60"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
                Quick amounts
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((quickAmount) => {
                  const active = amount === quickAmount;
                  return (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => handleQuickAmount(quickAmount)}
                      className={[
                        'rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
                        active
                          ? 'border-neutral-100 bg-neutral-100 text-neutral-950'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:text-neutral-100',
                      ].join(' ')}
                    >
                      ${quickAmount.toLocaleString('en-US')}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400">
                <ArrowRightLeft className="h-3.5 w-3.5" />
                Calculation mode
              </p>
              <div className="flex rounded-xl border border-neutral-800 bg-neutral-900/40 p-1">
                <ToggleButton
                  active={mode === 'forward'}
                  onClick={() => setMode('forward')}
                >
                  Standard — invoicing / sending
                </ToggleButton>
                <ToggleButton
                  active={mode === 'reverse'}
                  onClick={() => setMode('reverse')}
                >
                  Reverse — exact net in hand
                </ToggleButton>
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400">
                <Globe className="h-3.5 w-3.5" />
                Transaction type
              </p>
              <div className="flex rounded-xl border border-neutral-800 bg-neutral-900/40 p-1">
                <ToggleButton
                  active={region === 'domestic'}
                  onClick={() => setRegion('domestic')}
                >
                  US Domestic
                </ToggleButton>
                <ToggleButton
                  active={region === 'international'}
                  onClick={() => setRegion('international')}
                >
                  International / Cross-Border
                </ToggleButton>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm font-medium text-neutral-200 transition hover:border-neutral-700 hover:bg-neutral-900"
            >
              {copyState === 'copied' ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  Copied to clipboard
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-neutral-400" />
                  Copy summary
                </>
              )}
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-100">
                  Provider Comparison
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  {bestProvider
                    ? `${PROVIDER_META[bestProvider.provider].name} gives the highest net payout at ${formatCurrency(bestProvider.netPayout)}.`
                    : 'Adjust the amount to see live comparisons.'}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {results.map((result) => (
                <ProviderCard
                  key={result.provider}
                  result={result}
                  isBest={bestProvider?.provider === result.provider}
                  expanded={expandedCard === result.provider}
                  onToggleExpand={() =>
                    setExpandedCard((prev) =>
                      prev === result.provider ? null : result.provider,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
