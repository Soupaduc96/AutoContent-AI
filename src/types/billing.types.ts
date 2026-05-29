/**
 * Billing Types
 */

import { Plan, Status, Timestamp } from './common.types';

export interface Subscription extends Timestamp {
  id: string;
  organizationId: string;
  plan: Plan;
  status: Status;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  stripeSubscriptionId: string;
}

export interface Invoice extends Timestamp {
  id: string;
  organizationId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'void';
  paidAt?: Date;
  stripeInvoiceId: string;
  pdfUrl?: string;
}

export interface PaymentMethod extends Timestamp {
  id: string;
  organizationId: string;
  type: 'card' | 'bank_account';
  last4: string;
  stripePaymentMethodId: string;
  isDefault: boolean;
}

export interface UsageStats extends Timestamp {
  organizationId: string;
  period: 'daily' | 'monthly';
  postsCreated: number;
  assetsStored: number;
  clientsManaged: number;
}
