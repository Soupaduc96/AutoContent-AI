# Content Assets Feature

## Purpose

Asset/file management system:
- Upload files (images, videos, documents)
- Organize in folders
- Search and filter
- Usage tracking
- Version history (future)
- CDN delivery

## Structure

```
content-assets/
├── components/          # Assets UI
│   ├── AssetUploader.tsx
│   ├── AssetGallery.tsx
│   ├── AssetCard.tsx
│   ├── FolderTree.tsx
│   └── index.ts
├── pages/               # Assets pages
│   ├── page.tsx
│   └── [id]/page.tsx
├── api/                 # Assets API
│   ├── upload/route.ts
│   ├── route.ts         # GET, DELETE
│   ├── folders/route.ts
│   └── search/route.ts
├── services/            # Assets logic
│   ├── index.ts
│   └── assetsService.ts
├── types/               # Assets types
│   ├── index.ts
│   └── asset.types.ts
├── validations/         # Assets schemas
│   ├── index.ts
│   └── asset.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
export type AssetType = 'image' | 'video' | 'document' | 'audio';

export interface Asset {
  id: string;
  organizationId: string;
  name: string;
  type: AssetType;
  mimeType: string;
  size: number;
  url: string;
  storageKey: string;
  tags: string[];
  folderId?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface AssetFolder {
  id: string;
  organizationId: string;
  name: string;
  parentFolderId?: string;
  createdAt: Date;
}
```

## Services

```typescript
export const assetsService = {
  uploadAsset: async (orgId: string, file: File) => {},
  getAssets: async (orgId: string, folderId?: string) => {},
  getAssetById: async (assetId: string) => {},
  deleteAsset: async (assetId: string) => {},
  createFolder: async (orgId: string, name: string) => {},
  searchAssets: async (orgId: string, query: string) => {},
};
```

## Components

```typescript
// AssetUploader - File upload UI
export default function AssetUploader({ onUpload }) {}

// AssetGallery - Display assets
export default function AssetGallery({ folderId }) {}

// AssetCard - Single asset
export default function AssetCard({ asset }) {}

// FolderTree - Folder navigation
export default function FolderTree({ selectedFolder }) {}
```

## API Routes

```
POST   /api/assets/upload         # Upload file
GET    /api/assets                # List assets
GET    /api/assets/:id            # Get asset
DELETE /api/assets/:id            # Delete asset

POST   /api/assets/folders        # Create folder
GET    /api/assets/folders        # List folders
DELETE /api/assets/folders/:id    # Delete folder

GET    /api/assets/search?q=term  # Search assets
```

## Upload Handling

```typescript
// api/upload/route.ts
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  // Validate file
  if (!file) throw new Error('No file');

  // Upload to storage (Supabase/S3)
  const url = await uploadToStorage(file);

  // Save metadata to DB
  const asset = await assetsService.uploadAsset(orgId, {
    name: file.name,
    url,
    size: file.size,
    type: detectAssetType(file.type),
  });

  return Response.json({ success: true, data: asset });
}
```

## Storage Configuration

```typescript
// lib/services/storage.ts
import { S3Client } from '@aws-sdk/client-s3';
// or Supabase storage

export async function uploadToStorage(file: File) {
  // Upload and return URL
}
```

## Feature Flags

```typescript
FEATURES.ASSETS = {
  ENABLED: true,
  FOLDER_ORGANIZATION: true,
  VERSION_HISTORY: false, // Sprint 3
  CDN_DELIVERY: true,
}
```

## Future Enhancements

- [ ] Version history
- [ ] Bulk upload
- [ ] Drag and drop
- [ ] Image optimization
- [ ] Video transcoding
- [ ] Usage analytics
- [ ] Sharing/permissions
- [ ] Comments/annotations
