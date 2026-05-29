/**
 * API Route: Sign Up
 * 
 * POST /api/auth/signup
 * 
 * Creates a new user account
 */

import { NextRequest, NextResponse } from 'next/server';
import { SignUpSchema } from '@/validations';
import { authService } from '@/services';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input
    const validated = SignUpSchema.parse(data);

    // Create user via service
    const user = await authService.signUp(validated.email, validated.password);

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Sign up error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create account',
      },
      { status: 400 }
    );
  }
}
