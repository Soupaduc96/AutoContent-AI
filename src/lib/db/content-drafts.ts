import { supabaseClient } from './index';

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
  const { data: draft, error } =
    await supabaseClient
      .from('content_drafts')
      .insert({
        user_id: clerkUserId,
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
    console.error(error);
    return null;
  }

  return draft;
}

export async function getDrafts(
  clerkUserId: string
) {
  const { data, error } =
    await supabaseClient
      .from('content_drafts')
      .select('*')
      .order('created_at', {
        ascending: false,
      });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function getDraftById(
  clerkUserId: string,
  draftId: string
) {
  const { data, error } =
    await supabaseClient
      .from('content_drafts')
      .select('*')
      .eq('id', draftId)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}