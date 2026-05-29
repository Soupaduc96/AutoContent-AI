# Dashboard Feature

## Purpose

Main hub after authentication showing:
- Overview/metrics
- Quick actions
- Recent activity
- Navigation
- Shared dashboard components

## Structure

```
dashboard/
├── components/          # Dashboard UI
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   ├── MetricsCard.tsx
│   └── index.ts
├── pages/               # Dashboard pages
│   └── page.tsx
├── api/                 # Dashboard API
│   ├── metrics/route.ts
│   └── activity/route.ts
├── services/            # Dashboard logic
│   ├── index.ts
│   └── dashboardService.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Components

```typescript
// DashboardLayout - Main layout wrapper
export default function DashboardLayout({ children }) {}

// Sidebar - Navigation sidebar
export default function Sidebar() {}

// TopNav - Top navigation bar
export default function TopNav() {}

// MetricsCard - Display metrics
export default function MetricsCard({ title, value, trend }) {}
```

## Services

```typescript
export const dashboardService = {
  getMetrics: async (organizationId: string) => {},
  getRecentActivity: async (organizationId: string) => {},
  getQuickStats: async (organizationId: string) => {},
};
```

## API Routes

```
GET /api/dashboard/metrics    # Get dashboard metrics
GET /api/dashboard/activity   # Get recent activity
```

## Usage

```typescript
import { DashboardLayout } from '@/features/dashboard/components';

export default function ProtectedRoute({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
```

## Integration Points

- **Auth** - Guards access
- **Billing** - Shows subscription status
- **Posts** - Shows post counts
- **Clients** - Shows client counts
- **Assets** - Shows storage usage

## Future Enhancements

- [ ] Customizable dashboard widgets
- [ ] User preferences for layout
- [ ] Dark mode support
- [ ] Mobile responsive improvements
