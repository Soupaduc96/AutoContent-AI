# Settings Feature

## Purpose

User and organization settings:
- Profile settings
- Account settings
- Preferences
- Organization settings
- Team management
- Security settings

## Structure

```
settings/
├── components/          # Settings UI
│   ├── ProfileSettings.tsx
│   ├── AccountSettings.tsx
│   ├── PreferencesSettings.tsx
│   ├── OrganizationSettings.tsx
│   └── index.ts
├── pages/               # Settings pages
│   ├── page.tsx
│   ├── profile/page.tsx
│   ├── account/page.tsx
│   ├── organization/page.tsx
│   └── preferences/page.tsx
├── api/                 # Settings API
│   ├── profile/route.ts
│   ├── preferences/route.ts
│   └── organization/route.ts
├── services/            # Settings logic
│   ├── index.ts
│   └── settingsService.ts
├── types/               # Settings types
│   ├── index.ts
│   └── settings.types.ts
├── validations/         # Settings schemas
│   ├── index.ts
│   └── settings.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  timezone?: string;
  locale?: string;
}

export interface UserPreferences {
  userId: string;
  emailNotifications: boolean;
  darkMode: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface OrganizationSettings {
  organizationId: string;
  name: string;
  logo?: string;
  timezone?: string;
  domain?: string;
}
```

## Services

```typescript
export const settingsService = {
  // Profile
  getProfile: async (userId: string) => {},
  updateProfile: async (userId: string, data: Partial<UserProfile>) => {},
  uploadAvatar: async (userId: string, file: File) => {},

  // Preferences
  getPreferences: async (userId: string) => {},
  updatePreferences: async (userId: string, data: Partial<UserPreferences>) => {},

  // Organization
  getOrgSettings: async (orgId: string) => {},
  updateOrgSettings: async (orgId: string, data: Partial<OrganizationSettings>) => {},
};
```

## Components

```typescript
// ProfileSettings - User profile
export default function ProfileSettings() {}

// PreferencesSettings - User preferences
export default function PreferencesSettings() {}

// OrganizationSettings - Organization settings
export default function OrganizationSettings() {}
```

## API Routes

```
GET    /api/settings/profile
PUT    /api/settings/profile

GET    /api/settings/preferences
PUT    /api/settings/preferences

GET    /api/settings/organization
PUT    /api/settings/organization
```

## Usage

```typescript
import { ProfileSettings } from '@/features/settings/components';
import { settingsService } from '@/features/settings/services';

// Update profile
await settingsService.updateProfile(userId, {
  displayName: 'John Doe',
  bio: 'Content creator',
});

// Update preferences
await settingsService.updatePreferences(userId, {
  darkMode: true,
  emailNotifications: false,
});
```

## Integration Points

- **Auth** - Tied to user
- **Dashboard** - Settings link in top nav
- **Billing** - Organization billing settings
- **All Features** - Use preferences for UX

## Future Enhancements

- [ ] Security settings
- [ ] Two-factor authentication
- [ ] Session management
- [ ] API key management
- [ ] Webhooks configuration
- [ ] Audit logs
- [ ] Data export
- [ ] Account deletion
