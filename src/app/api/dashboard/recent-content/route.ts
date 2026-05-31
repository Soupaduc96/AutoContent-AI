import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { getDrafts } from '@/lib/db/content-drafts';

export async function GET() {
  try {
    const userId = "demo-user";
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const drafts = await getDrafts(userId);

    return NextResponse.json(
      drafts.slice(0, 5)
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          'Failed to load recent content',
      },
      { status: 500 }
    );
  }
}