/**
 * Asset Types
 */

import { Timestamp } from './common.types';

export interface Asset extends Timestamp {
  id: string;
  organizationId: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  mimeType: string;
  size: number;
  url: string;
  storageKey: string;
  tags: string[];
  uploadedBy: string;
}

export interface AssetFolder extends Timestamp {
  id: string;
  organizationId: string;
  name: string;
  parentFolderId?: string;
}

export interface AssetUsage extends Timestamp {
  assetId: string;
  postId?: string;
  usedCount: number;
  lastUsedAt: Date;
}
