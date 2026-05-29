# Onboarding Feature

## Purpose

Guides new users through initial setup with a step-by-step wizard:
- Organization setup
- Profile completion
- Billing selection
- Team invitation
- Feature tours

## Structure

```
onboarding/
├── components/          # Onboarding UI
│   ├── OnboardingWizard.tsx
│   ├── StepIndicator.tsx
│   ├── StepNavigation.tsx
│   └── index.ts
├── pages/               # Onboarding pages
│   ├── page.tsx
│   └── [step]/page.tsx
├── api/                 # Onboarding API
│   ├── complete/route.ts
│   └── skip/route.ts
├── services/            # Onboarding logic
│   ├── index.ts
│   └── onboardingService.ts
├── types/               # Onboarding types
│   ├── index.ts
│   └── onboarding.types.ts
├── validations/         # Onboarding schemas
│   ├── index.ts
│   └── onboarding.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

export interface OnboardingProgress {
  userId: string;
  currentStep: number;
  completed: boolean;
  skipped: boolean;
}
```

## Steps

1. **Organization Setup** - Create/configure organization
2. **Profile Completion** - Add user profile info
3. **Billing Selection** - Choose subscription plan
4. **Team Invitation** - Invite team members
5. **Complete** - Redirect to dashboard

## Services

```typescript
export const onboardingService = {
  startOnboarding: async (userId: string) => {},
  completeStep: async (userId: string, step: number) => {},
  skipOnboarding: async (userId: string) => {},
  getProgress: async (userId: string) => {},
};
```

## Usage

```typescript
import { OnboardingWizard } from '@/features/onboarding/components';

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
```

## Integration Points

- **Auth** - Triggered after signup
- **Settings** - Can restart from settings
- **Dashboard** - Redirect after completion

## Future Enhancements

- [ ] Feature tours
- [ ] Skip individual steps
- [ ] Save progress
- [ ] Analytics tracking
