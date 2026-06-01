import { NextRequest, NextResponse } from 'next/server';
import { getSocialAccounts } from '@/lib/db/social-accounts';

export async function GET(request: NextRequest) {
  try {
    const userId = 'demo-user';

    const accounts = await getSocialAccounts(userId);

    return NextResponse.json({
      success: true,
      accounts,
    });
  } catch (error) {
    console.error('Error fetching social accounts:', error);

    return NextResponse.json({
      success: true,
      accounts: [],
    });
  }
}