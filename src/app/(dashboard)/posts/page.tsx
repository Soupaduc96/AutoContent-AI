/**
 * Posts Page
 * 
 * Content post management:
 * - View all posts
 * - Create new post
 * - Edit/delete posts
 * - Filter and search
 * - Draft management
 */

'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-slate-600">Create and manage your content</p>
        </div>
        <Button>Create Post</Button>
      </div>

      {/* Tabs or Filters */}
      <div className="flex gap-2">
        <Button variant="outline">All</Button>
        <Button variant="ghost">Draft</Button>
        <Button variant="ghost">Published</Button>
        <Button variant="ghost">Archived</Button>
      </div>

      {/* Posts List */}
      <Card className="p-6">
        <div className="text-center text-slate-600 py-12">
          <p>No posts yet</p>
          <Button variant="outline" className="mt-4">Create your first post</Button>
        </div>
      </Card>

      {/* TODO: Post grid/list component */}
    </div>
  );
}
