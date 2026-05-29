/**
 * Post Types
 */

import { Status, Timestamp } from './common.types';

export interface Post extends Timestamp {
  id: string;
  organizationId: string;
  title: string;
  content: string;
  description?: string;
  status: Status;
  scheduledFor?: Date;
  tags: string[];
  authorId: string;
}

export interface PostDraft extends Timestamp {
  id: string;
  organizationId: string;
  userId: string;
  content: Partial<Post>;
}

export interface PostAnalytics extends Timestamp {
  postId: string;
  views: number;
  engagement: number;
  shares: number;
  comments: number;
}
