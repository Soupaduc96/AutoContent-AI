import { supabaseClient } from './index';
import { getUserByClerkId } from './users';

export async function getCalendarEvents(
  clerkUserId: string
) {
  const user = await getUserByClerkId(
    clerkUserId
  );

  if (!user) {
    return [];
  }

  const { data, error } =
    await supabaseClient
      .from('content_calendar')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_for');

  if (error) {
    throw error;
  }

  return data || [];
}

export async function createCalendarEvent(
  clerkUserId: string,
  payload: {
    draftId?: string;
    title: string;
    platform: string;
    scheduledFor: string;
  }
) {
  const user = await getUserByClerkId(
    clerkUserId
  );

  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } =
    await supabaseClient
      .from('content_calendar')
      .insert({
        user_id: user.id,
        draft_id: payload.draftId,
        title: payload.title,
        platform: payload.platform,
        scheduled_for: payload.scheduledFor,
        status: 'scheduled',
      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}