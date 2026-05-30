import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import {
  getDrafts,
  createDraft,
} from '@/lib/db/content-drafts';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const drafts = await getDrafts(userId);

    return NextResponse.json(drafts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch drafts' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const draft = await createDraft(
      userId,
      {
        title: body.title,
        businessType: body.businessType,
        platform: body.platform,
        tone: body.tone,
        goal: body.goal,
        content: body.content,
      }
    );

    return NextResponse.json(draft);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to create draft' },
      { status: 500 }
    );
  }
}