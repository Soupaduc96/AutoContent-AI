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
  console.log('CLERK USER ID:', clerkUserId);

  const user = await getUserByClerkId(clerkUserId);

  console.log('USER FOUND:', user);

  if (!user) {
    throw new Error('User not found');
  }

  const { data: draft, error } = await supabaseClient
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
    console.error('CONTENT_DRAFT INSERT ERROR:', error);
    throw error;
  }

  console.log('DRAFT CREATED:', draft);

  return draft;
}

export async function getDrafts(clerkUserId: string) {
  console.log('GET DRAFTS FOR:', clerkUserId);

  const user = await getUserByClerkId(clerkUserId);

  console.log('USER FOUND:', user);

  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } = await supabaseClient
    .from('content_drafts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('GET DRAFTS ERROR:', error);
    throw error;
  }

  return data;
}