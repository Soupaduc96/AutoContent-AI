export async function GET(request: NextRequest) {
  try {
    console.log('Fetching demo user profile...');

    const user = await getOrCreateUser(
      DEMO_USER_ID,
      DEMO_USER_EMAIL,
      DEMO_USER_CLERK_ID
    );

    console.log('USER RESULT:', user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'getOrCreateUser returned null',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('PROFILE API ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch profile',
      },
      { status: 500 }
    );
  }
}