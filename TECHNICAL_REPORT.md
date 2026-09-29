# FeeCut: Technical Architecture & Project Report

## 1. Project Overview

**FeeCut** is a high-performance, privacy-first web application designed to help freelancers, contractors, and digital entrepreneurs compare payment gateway fees in real time. It calculates net payouts and reverse-engineers gross invoice amounts for Stripe, PayPal, and Wise, supporting both domestic and international transactions.

**Key Objectives:**
- **Performance:** Instant load times using Edge-ready Next.js Server Components and Client Components.
- **Privacy:** 100% client-side calculations with zero tracking or telemetry.
- **Accuracy:** Transparent, hard-coded fee formulas based on public gateway schedules.
- **Compliance:** Complete legal and privacy framework (Terms, Privacy, About, Contact) required for AdSense approval and user trust.

## 2. Technology Stack

- **Framework:** Next.js (App Router, React 19.x)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS (v4) with native CSS variables for the dark theme.
- **Icons:** `lucide-react` for lightweight, scalable vector icons.
- **Deployment Strategy:** Configured for edge deployment (static/client hybrid).

## 3. Core Architecture

The application follows the Next.js App Router architecture, aggressively utilizing React Server Components (RSC) for static layouts and SEO, while delegating interactive states to designated Client Components (`'use client'`).

### 3.1 Directory Structure

```text
/app
  ├── /about             # Static route: Mission and tech stack transparency
  ├── /contact           # Static route: Feedback form and support info
  ├── /privacy-policy    # Static route: AdSense-compliant privacy terms
  ├── /terms-of-service  # Static route: Financial disclaimers and TOS
  ├── globals.css        # Global Tailwind and base theme definitions
  ├── layout.tsx         # Root Server Component (HTML skeleton, fonts, global Footer)
  ├── page.tsx           # Home Server Component (SEO metadata, static sections)
  ├── robots.ts          # Dynamic robots.txt generation
  ├── sitemap.ts         # Dynamic sitemap.xml generation
  ├── icon.svg           # Primary application favicon
  └── apple-icon.svg     # Apple Touch icon variant

/components
  ├── Calculator.tsx     # Complex Client Component handling all fee logic/UI
  ├── ContentSection.tsx # Static UI component for homepage educational content
  └── Footer.tsx         # Global footer with navigation and legal disclaimers

/lib
  ├── calculator.ts      # Pure TypeScript module containing all fee math
  └── seo.ts             # Utilities for generating JSON-LD structured data
```

## 4. Key Systems & Implementation Details

### 4.1 Financial Calculation Engine (`lib/calculator.ts`)
The core value proposition relies on exact mathematical precision. To ensure accuracy and testability, the calculation logic is completely decoupled from the React UI.

- **Data Models:** Strongly typed `PaymentProvider`, `RegionType`, and `CalculationMode`.
- **Pure Functions:** Functions like `calculateForward` and `calculateReverse` take raw inputs and a `FeeConfig` and return a deterministic `CalculationResult`.
- **Modes:** 
  - *Forward Mode:* Subtracts gateway percentage and fixed fees from a gross amount.
  - *Reverse Mode:* Solves the algebraic equation `Gross = (Net + Fixed) / (1 - Percentage)` to ensure the user receives exact net payouts.
- **Rounding:** Ensures financial values are safely rounded to the nearest cent.

### 4.2 Interactive UI (`components/Calculator.tsx`)
The `Calculator` component acts as the primary interactive surface.
- **State Management:** Uses React `useState` to track input amounts, toggle modes (Forward/Reverse), and select regions (Domestic/International).
- **Memoization:** Recalculates fees via `useMemo` specifically when inputs change, avoiding unnecessary renders.
- **Animations:** Employs Tailwind utility classes (`transition`, `hover:scale`, `animate-pulse`) to provide fluid micro-interactions without heavy animation libraries.

### 4.3 SEO & Structured Data (`lib/seo.ts`)
FeeCut is optimized for search engine discoverability.
- **JSON-LD Generation:** Exports utility functions (`buildSoftwareApplicationJsonLd`, `buildFaqPageJsonLd`, `buildWebPageJsonLd`) to inject schema.org metadata.
- **Static Metadata:** Each route (`page.tsx`) exports a strictly typed Next.js `Metadata` object, defining canonical URLs, titles, and descriptions.

### 4.4 Trust & Compliance (Static Pages)
To meet Google AdSense requirements and establish user trust, four dedicated static pages were created:
1. **Privacy Policy:** Explicitly details the use of standard log files and Google DoubleClick DART cookies, with instructions for opt-out. Confirms zero collection of financial data.
2. **Terms of Service:** Features a prominent *Financial Disclaimer* warning that calculations are estimates and users must verify official gateway schedules.
3. **About:** Outlines the project's mission and provides complete "Tech Stack Transparency."
4. **Contact:** Provides a client-side feedback form, expected response times, and direct email links (`support@`, `privacy@`).

### 4.5 Design System & Aesthetics
- **Color Palette:** A dark-mode-exclusive design anchored on `#09090b` (zinc-950). Highlights utilize a vibrant spectrum of Indigo, Violet, Emerald, and Amber.
- **Glassmorphism:** Uses heavy `backdrop-blur` filters combined with low-opacity borders and backgrounds (`bg-neutral-950/40`) to create depth over ambient background glows.
- **Typography:** Uses `Inter` (via `next/font/google`) configured for optimal reading flow and numerical legibility.

## 5. Security & Privacy Defaults

FeeCut is inherently secure by design:
- **Zero Backend Payload:** Financial data typed into the calculator is never serialized, logged, or transmitted over the network.
- **No Analytics:** Shipped without Google Analytics, Mixpanel, or custom trackers. The only tracking mechanism is the external AdSense network (disclosed in the Privacy Policy).
- **Stateless Operation:** No databases, no user sessions, and no local storage persistence required.

## 6. Future Scalability

The current architecture is highly extensible:
- **Adding Providers:** New gateways (e.g., Square, Payoneer) can be added simply by updating the `FEE_CONFIGS` dictionary in `calculator.ts` and mapping a new UI color in `Calculator.tsx`.
- **Localization:** The `formatCurrency` utility currently defaults to USD but supports full `Intl.NumberFormat` locales for future multi-currency support.
- **Content Expansion:** The `ContentSection.tsx` is structured to easily ingest Markdown or CMS data if a blog or deeper resource center is required.
