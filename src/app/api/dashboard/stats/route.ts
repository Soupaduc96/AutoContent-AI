import { NextResponse } from 'next/server';

import { getDrafts } from '@/lib/db/content-drafts';
import { getCalendarEvents } from '@/lib/db/content-calendar';
import { getSocialAccounts } from '@/lib/db/social-accounts';

export async function GET() {
  try {
    const userId = 'demo-user';

    const drafts = await getDrafts(userId);
    const calendar = await getCalendarEvents(userId);
    const platforms = await getSocialAccounts(userId);

    return NextResponse.json({
      postsGenerated: drafts?.length || 0,
      scheduledPosts: calendar?.length || 0,
      connectedPlatforms: platforms?.length || 0,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      postsGenerated: 0,
      scheduledPosts: 0,
      connectedPlatforms: 0,
    });
  }
}