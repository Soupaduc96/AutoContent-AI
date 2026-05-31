import { NextRequest, NextResponse } from 'next/server';

import {
  getDrafts,
  createDraft,
} from '@/lib/db/content-drafts';

export async function GET() {
  try {
    const userId = 'demo-user';

    const drafts = await getDrafts(userId);

    return NextResponse.json(
      Array.isArray(drafts) ? drafts : []
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json([]);
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const userId = 'demo-user';

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