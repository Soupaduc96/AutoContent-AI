import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import {
  getCalendarEvents,
  createCalendarEvent,
} from '@/lib/db/content-calendar';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const events = await getCalendarEvents(userId);

  return NextResponse.json(events);
}

export async function POST(
  request: NextRequest
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = await request.json();

  const event = await createCalendarEvent(
    userId,
    {
      draftId: body.draftId,
      title: body.title,
      platform: body.platform,
      scheduledFor: body.scheduledFor,
    }
  );

  return NextResponse.json(event);
}