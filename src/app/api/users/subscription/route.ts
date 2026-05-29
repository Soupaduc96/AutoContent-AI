/**
 * POST /api/users/subscription
 * 
 * Update user subscription plan
 */

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { updateSubscriptionPlan } from '@/lib/db/users';
import { z } from 'zod';

const subscriptionSchema = z.object({
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = subscriptionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid subscription plan' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Stripe for payment processing
    // For now, just update the subscription plan directly

    const user = await updateSubscriptionPlan(userId, result.data.plan);

    return NextResponse.json({
      success: true,
      message: `Subscription upgraded to ${result.data.plan}`,
      user,
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to update subscription',
      },
      { status: 500 }
    );
  }
}
