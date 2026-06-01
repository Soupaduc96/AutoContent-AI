/**
 * GET /api/users/profile
 * 
 * Fetch current user profile
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/db/users';

const DEMO_USER_ID = 'b7f01ee9-2678-4c4c-bb76-91be2471fab8';
const DEMO_USER_EMAIL = 'souffrantpaulducasse.spd@gmail.com';
const DEMO_USER_CLERK_ID = 'user_3EN6Fu2JW15pmwOuIikifzNdcOu';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    const isDemoFallback = !userId;
    const effectiveUserId = isDemoFallback ? DEMO_USER_ID : userId;

    const clerkUser = isDemoFallback ? null : await currentUser();

    if (!effectiveUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!clerkUser && !isDemoFallback) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = await getOrCreateUser(
      effectiveUserId,
      clerkUser?.primaryEmailAddress?.emailAddress || DEMO_USER_EMAIL,
      clerkUser?.id || DEMO_USER_CLERK_ID
    );

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/profile
 * 
 * Update user profile
 */
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();

    const effectiveUserId = userId || DEMO_USER_ID;

    const body = await request.json();
    const { firstName, lastName } = body;

    const { updateUser } = await import('@/lib/db/users');
    const user = await updateUser(effectiveUserId, {
      firstName,
      lastName,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to update profile',
      },
      { status: 500 }
    );
  }
}
