import { NextRequest, NextResponse } from 'next/server';

import {
  getCalendarEvents,
  createCalendarEvent,
} from '@/lib/db/content-calendar';

export async function GET() {
  try {
    const userId = 'demo-user';

    const events = await getCalendarEvents(
      userId
    );

    return NextResponse.json(
      Array.isArray(events) ? events : []
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

    const event =
      await createCalendarEvent(
        userId,
        {
          draftId: body.draftId,
          title: body.title,
          platform: body.platform,
          scheduledFor:
            body.scheduledFor,
        }
      );

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          'Failed to create calendar event',
      },
      { status: 500 }
    );
  }
}