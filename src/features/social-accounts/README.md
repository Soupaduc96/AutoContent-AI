# Social Accounts Feature

## Purpose

Manages connected social media accounts (future feature):
- Connect/disconnect accounts
- Account management
- Settings per platform
- Credentials storage

**Note:** Social publishing is OUT of scope for Sprint 1.

## Structure

```
social-accounts/
├── components/          # Social accounts UI
│   ├── AccountConnector.tsx
│   ├── AccountsList.tsx
│   ├── AccountCard.tsx
│   └── index.ts
├── pages/               # Social pages
│   └── page.tsx
├── api/                 # Social API
│   ├── connect/route.ts
│   ├── disconnect/route.ts
│   └── [id]/route.ts
├── services/            # Social logic
│   ├── index.ts
│   └── socialService.ts
├── types/               # Social types
│   ├── index.ts
│   └── social.types.ts
├── validations/         # Social schemas
│   ├── index.ts
│   └── social.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
export type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';

export interface SocialAccount {
  id: string;
  organizationId: string;
  platform: SocialPlatform;
  accountName: string;
  accountId: string;
  connected: boolean;
  connectedAt: Date;
  disconnectedAt?: Date;
}
```

## Services

```typescript
export const socialService = {
  connectAccount: async (orgId: string, platform: SocialPlatform) => {},
  disconnectAccount: async (accountId: string) => {},
  getAccounts: async (orgId: string) => {},
  testConnection: async (accountId: string) => {},
};
```

## API Routes

```
POST   /api/social-accounts/connect/:platform
DELETE /api/social-accounts/:id

GET    /api/social-accounts
GET    /api/social-accounts/:id
```

## Status: Out of Scope Sprint 1

- ❌ Social publishing
- ❌ Social analytics
- ❌ Scheduled posting to social

Coming in Phase 2/3.

## Future Enhancements

- [ ] OAuth connections
- [ ] Multi-account management
- [ ] Account permissions
- [ ] Connection testing
- [ ] Rate limiting
- [ ] Error recovery
