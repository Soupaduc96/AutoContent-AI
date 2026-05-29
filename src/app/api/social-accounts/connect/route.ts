/**
 * POST /api/social-accounts/connect
 * 
 * Connect a new social media account
 */

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { connectSocialAccount } from '@/lib/db/social-accounts';
import { ConnectPlatformSchema } from '@/validations/platform.schema';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const result = ConnectPlatformSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const account = await connectSocialAccount(userId, result.data);

    return NextResponse.json(
      {
        success: true,
        account,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error connecting social account:', error);

    // Handle duplicate connection error
    if (error instanceof Error && error.message.includes('already connected')) {
      return NextResponse.json(
        { error: 'This account is already connected' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to connect social account',
      },
      { status: 500 }
    );
  }
}
