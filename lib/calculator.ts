export type PaymentProvider = 'stripe' | 'paypal' | 'wise';

export type RegionType = 'domestic' | 'international';

export type CalculationMode = 'forward' | 'reverse';

export interface FeeConfig {
  readonly percentageRate: number;
  readonly fixedFee: number;
  readonly label: string;
}

export interface CalculationInput {
  readonly amount: number;
  readonly provider: PaymentProvider;
  readonly region?: RegionType;
  readonly mode: CalculationMode;
}

export interface FeeBreakdown {
  readonly percentagePortion: number;
  readonly fixedPortion: number;
  readonly totalFee: number;
}

export interface CalculationResult {
  readonly provider: PaymentProvider;
  readonly region: RegionType | null;
  readonly mode: CalculationMode;
  readonly invoiceAmount: number;
  readonly feeBreakdown: FeeBreakdown;
  readonly netPayout: number;
  readonly percentageLost: number;
  readonly config: FeeConfig;
}

const FEE_CONFIGS: Readonly<Record<PaymentProvider, Readonly<Record<RegionType, FeeConfig>>>> = {
  stripe: {
    domestic: {
      percentageRate: 0.029,
      fixedFee: 0.3,
      label: 'Stripe Standard US Domestic',
    },
    international: {
      percentageRate: 0.044,
      fixedFee: 0.3,
      label: 'Stripe International',
    },
  },
  paypal: {
    domestic: {
      percentageRate: 0.0299,
      fixedFee: 0.49,
      label: 'PayPal Standard US Domestic',
    },
    international: {
      percentageRate: 0.0449,
      fixedFee: 0.49,
      label: 'PayPal International',
    },
  },
  wise: {
    domestic: {
      percentageRate: 0.0045,
      fixedFee: 0.5,
      label: 'Wise Transfer Fee',
    },
    international: {
      percentageRate: 0.0045,
      fixedFee: 0.5,
      label: 'Wise Transfer Fee',
    },
  },
};

const roundToCents = (value: number): number => {
  return Math.round(value * 100) / 100;
};

const validateAmount = (amount: number): void => {
  if (!Number.isFinite(amount)) {
    throw new Error('Amount must be a finite number');
  }
  if (amount < 0) {
    throw new Error('Amount must be non-negative');
  }
};

export const getFeeConfig = (
  provider: PaymentProvider,
  region: RegionType = 'domestic',
): FeeConfig => {
  const providerConfig = FEE_CONFIGS[provider];
  if (!providerConfig) {
    throw new Error(`Unknown payment provider: ${provider}`);
  }

  const config = providerConfig[region];
  if (!config) {
    throw new Error(`Unknown region type: ${region} for provider ${provider}`);
  }

  return config;
};

const calculatePercentagePortion = (amount: number, percentageRate: number): number => {
  return roundToCents(amount * percentageRate);
};

const calculateFee = (amount: number, config: FeeConfig): FeeBreakdown => {
  const percentagePortion = calculatePercentagePortion(amount, config.percentageRate);
  const fixedPortion = roundToCents(config.fixedFee);
  const totalFee = roundToCents(percentagePortion + fixedPortion);

  return {
    percentagePortion,
    fixedPortion,
    totalFee,
  };
};

const calculatePercentageLost = (totalFee: number, invoiceAmount: number): number => {
  if (invoiceAmount === 0) {
    return 0;
  }
  return roundToCents((totalFee / invoiceAmount) * 100);
};

const calculateForward = (
  invoiceAmount: number,
  config: FeeConfig,
  provider: PaymentProvider,
  region: RegionType | null,
): CalculationResult => {
  const feeBreakdown = calculateFee(invoiceAmount, config);
  const netPayout = roundToCents(invoiceAmount - feeBreakdown.totalFee);
  const percentageLost = calculatePercentageLost(feeBreakdown.totalFee, invoiceAmount);

  return {
    provider,
    region,
    mode: 'forward',
    invoiceAmount: roundToCents(invoiceAmount),
    feeBreakdown,
    netPayout,
    percentageLost,
    config,
  };
};

const calculateReverse = (
  desiredNet: number,
  config: FeeConfig,
  provider: PaymentProvider,
  region: RegionType | null,
): CalculationResult => {
  const denominator = 1 - config.percentageRate;
  if (denominator <= 0) {
    throw new Error('Invalid fee configuration: percentage rate must be less than 100%');
  }

  const rawInvoiceAmount = (desiredNet + config.fixedFee) / denominator;
  const invoiceAmount = roundToCents(rawInvoiceAmount);
  const feeBreakdown = calculateFee(invoiceAmount, config);
  const netPayout = roundToCents(invoiceAmount - feeBreakdown.totalFee);
  const percentageLost = calculatePercentageLost(feeBreakdown.totalFee, invoiceAmount);

  return {
    provider,
    region,
    mode: 'reverse',
    invoiceAmount,
    feeBreakdown,
    netPayout,
    percentageLost,
    config,
  };
};

export const calculateFees = (input: CalculationInput): CalculationResult => {
  const { amount, provider, region, mode } = input;

  validateAmount(amount);

  const effectiveRegion: RegionType | null =
    provider === 'wise' ? null : (region ?? 'domestic');
  const configRegion: RegionType = effectiveRegion ?? 'domestic';
  const config = getFeeConfig(provider, configRegion);

  if (mode === 'forward') {
    return calculateForward(amount, config, provider, effectiveRegion);
  }

  return calculateReverse(amount, config, provider, effectiveRegion);
};

export const calculateAllProviders = (
  input: Omit<CalculationInput, 'provider'>,
): ReadonlyArray<CalculationResult> => {
  const providers: ReadonlyArray<PaymentProvider> = ['stripe', 'paypal', 'wise'];
  return providers.map((provider) =>
    calculateFees({
      ...input,
      provider,
    }),
  );
};

export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPercentage = (
  value: number,
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};
