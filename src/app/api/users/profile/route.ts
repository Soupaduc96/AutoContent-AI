/**
 * GET /api/users/profile
 * 
 * Fetch current user profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser, updateUser } from '@/lib/db/users';

const DEMO_USER_ID = 'b7f01ee9-2678-4c4c-bb76-91be2471fab8';
const DEMO_USER_EMAIL = 'souffrantpaulducasse.spd@gmail.com';
const DEMO_USER_CLERK_ID = 'user_3EN6Fu2JW15pmwOuIikifzNdcOu';

export async function GET(request: NextRequest) {
  try {
    const user = await getOrCreateUser(
      DEMO_USER_ID,
      DEMO_USER_EMAIL,
      DEMO_USER_CLERK_ID
    );

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error fetching demo user profile:', error);
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
    const body = await request.json();
    const { firstName, lastName } = body;

    await getOrCreateUser(
      DEMO_USER_ID,
      DEMO_USER_EMAIL,
      DEMO_USER_CLERK_ID
    );

    const user = await updateUser(DEMO_USER_ID, {
      firstName,
      lastName,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error updating demo user profile:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to update profile',
      },
      { status: 500 }
    );
  }
}
