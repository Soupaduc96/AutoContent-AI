/**
 * GET /api/social-accounts
 * 
 * Fetch all connected social accounts for the current user
 */

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getSocialAccounts } from '@/lib/db/social-accounts';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accounts = await getSocialAccounts(userId);

    return NextResponse.json({
      success: true,
      accounts,
    });
  } catch (error) {
    console.error('Error fetching social accounts:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch social accounts',
      },
      { status: 500 }
    );
  }
}
