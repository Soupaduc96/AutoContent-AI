import { NextRequest, NextResponse } from 'next/server';

const DEMO_USER = {
  id: 'demo-user',
  firstName: 'Paul',
  lastName: 'Souffrant',
  email: 'souffrantpaulducasse.spd@gmail.com',
};

export async function GET() {
  return NextResponse.json({
    success: true,
    user: DEMO_USER,
  });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      user: {
        ...DEMO_USER,
        firstName: body.firstName ?? DEMO_USER.firstName,
        lastName: body.lastName ?? DEMO_USER.lastName,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}