# Billing Feature

## Purpose

Manages subscription and payment operations:
- Subscription management
- Pricing tiers display
- Invoice history
- Payment methods
- Usage tracking
- Stripe integration

## Structure

```
billing/
├── components/          # Billing UI
│   ├── PricingCards.tsx
│   ├── SubscriptionManager.tsx
│   ├── InvoiceList.tsx
│   ├── PaymentMethodForm.tsx
│   └── index.ts
├── pages/               # Billing pages
│   ├── page.tsx
│   └── invoices/page.tsx
├── api/                 # Billing API
│   ├── subscription/route.ts
│   ├── invoices/route.ts
│   ├── payment-method/route.ts
│   └── webhook/stripe/route.ts
├── services/            # Billing logic
│   ├── index.ts
│   └── billingService.ts
├── types/               # Billing types
│   ├── index.ts
│   └── billing.types.ts
├── validations/         # Billing schemas
│   ├── index.ts
│   └── billing.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
export type Plan = 'free' | 'starter' | 'professional' | 'enterprise';

export interface Subscription {
  id: string;
  organizationId: string;
  plan: Plan;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeSubscriptionId: string;
}

export interface Invoice {
  id: string;
  organizationId: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl: string;
  createdAt: Date;
}
```

## Services

```typescript
export const billingService = {
  createSubscription: async (orgId: string, plan: Plan) => {},
  updateSubscription: async (subId: string, plan: Plan) => {},
  cancelSubscription: async (subId: string) => {},
  getInvoices: async (orgId: string) => {},
  addPaymentMethod: async (orgId: string, token: string) => {},
};
```

## Components

```typescript
// PricingCards - Display pricing tiers
export default function PricingCards() {}

// SubscriptionManager - Manage current subscription
export default function SubscriptionManager() {}

// InvoiceList - Display invoice history
export default function InvoiceList() {}

// PaymentMethodForm - Add/edit payment method
export default function PaymentMethodForm() {}
```

## API Routes

```
GET    /api/billing/subscription
POST   /api/billing/subscription
PUT    /api/billing/subscription
DELETE /api/billing/subscription

GET    /api/billing/invoices
GET    /api/billing/invoices/:id

POST   /api/billing/payment-method
DELETE /api/billing/payment-method/:id

POST   /api/billing/webhook/stripe  # Stripe webhooks
```

## Stripe Integration

```typescript
// Initialize Stripe in services
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const billingService = {
  createCheckoutSession: async (orgId: string, plan: Plan) => {
    const session = await stripe.checkout.sessions.create({
      // ... session config
    });
    return session;
  },
};
```

## Usage

```typescript
import { PricingCards } from '@/features/billing/components';
import { billingService } from '@/features/billing/services';

export default function BillingPage() {
  return <PricingCards />;
}
```

## Webhook Handling

```typescript
// api/webhook/stripe/route.ts
export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case 'checkout.session.completed':
      // Handle subscription created
      break;
    case 'invoice.payment_succeeded':
      // Handle payment
      break;
  }
}
```

## Feature Flags

```typescript
FEATURES.BILLING = {
  ENABLED: true,
  STRIPE_INTEGRATION: true,
  SUBSCRIPTION_MANAGEMENT: true,
  USAGE_TRACKING: true,
}
```

## Future Enhancements

- [ ] Custom billing cycles
- [ ] Volume discounts
- [ ] Annual billing discount
- [ ] Metered billing
- [ ] Usage-based pricing
