/**
 * POST /api/social-accounts/disconnect
 * 
 * Disconnect a social media account
 */

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { disconnectSocialAccount } from '@/lib/db/social-accounts';

interface DisconnectRequest {
  accountId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: DisconnectRequest = await request.json();

    if (!body.accountId) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    const success = await disconnectSocialAccount(userId, body.accountId);

    return NextResponse.json({
      success,
      message: 'Social account disconnected successfully',
    });
  } catch (error) {
    console.error('Error disconnecting social account:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to disconnect social account',
      },
      { status: 500 }
    );
  }
}
