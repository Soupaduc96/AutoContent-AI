/**
 * API Route: Get Posts
 * 
 * GET /api/posts
 * POST /api/posts
 * 
 * List all posts or create a new one
 */

import { NextRequest, NextResponse } from 'next/server';
import { CreatePostSchema } from '@/validations';
import { postsService } from '@/services';

export async function GET(req: NextRequest) {
  try {
    // TODO: Get organizationId from auth context
    const organizationId = req.headers.get('x-org-id') || '';

    if (!organizationId) {
      return NextResponse.json(
        { success: false, error: 'Organization ID required' },
        { status: 400 }
      );
    }

    const posts = await postsService.getPosts(organizationId);

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input
    const validated = CreatePostSchema.parse(data);

    // TODO: Get organizationId from auth context
    const organizationId = req.headers.get('x-org-id') || '';

    if (!organizationId) {
      return NextResponse.json(
        { success: false, error: 'Organization ID required' },
        { status: 400 }
      );
    }

    const post = await postsService.createPost(organizationId, validated);

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 400 }
    );
  }
}
