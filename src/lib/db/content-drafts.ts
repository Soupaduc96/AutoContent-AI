import { supabaseClient } from './index';
import { getUserByClerkId } from './users';

export async function createDraft(
  clerkUserId: string,
  data: {
    title: string;
    businessType: string;
    platform: string;
    tone: string;
    goal: string;
    content: string;
  }
) {
  const user = await getUserByClerkId(
    clerkUserId
  );

  if (!user) {
    throw new Error('User not found');
  }

  const { data: draft, error } =
    await supabaseClient
      .from('content_drafts')
      .insert({
        user_id: user.id,
        title: data.title,
        business_type: data.businessType,
        platform: data.platform,
        tone: data.tone,
        goal: data.goal,
        content: data.content,
        status: 'draft',
      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  return draft;
}

export async function getDrafts(
  clerkUserId: string
) {
  const user = await getUserByClerkId(
    clerkUserId
  );

  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } =
    await supabaseClient
      .from('content_drafts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data;
}

export async function getDraftById(
  clerkUserId: string,
  draftId: string
) {
  const user = await getUserByClerkId(
    clerkUserId
  );

  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } =
    await supabaseClient
      .from('content_drafts')
      .select('*')
      .eq('id', draftId)
      .eq('user_id', user.id)
      .single();

  if (error) {
    throw error;
  }

  return data;
}