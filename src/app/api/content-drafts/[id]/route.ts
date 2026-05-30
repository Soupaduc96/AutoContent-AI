import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  return NextResponse.json({
    message: 'Draft API works',
  });
}