# AutoContent AI - Project Structure

## Overview

This is a production-grade SaaS application built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Supabase, and Stripe.

**Sprint 1 Focus:** Foundation and core infrastructure only. Features like AI generation, social integrations, publishing engine, and analytics are OUT of scope.

## Directory Architecture

### `/src/app` - Next.js App Router

The application uses Next.js 13+ App Router for routing and layout management.

#### `/src/app/(auth)` - Authentication Routes
- Login page
- Sign up page
- Password reset flow
- Not wrapped in dashboard layout

#### `/src/app/(dashboard)` - Dashboard Group
Protected routes using route groups. All routes require authentication.

- **`/dashboard`** - Main dashboard landing page
- **`/onboarding`** - Step-by-step onboarding wizard
- **`/billing`** - Subscription and billing management
- **`/settings`** - User account settings
- **`/clients`** - Agency client management
- **`/posts`** - Content post management
- **`/assets`** - Asset library and file management

#### `/src/app/api` - API Routes

Backend API endpoints organized by feature:

- **`/api/auth`** - Authentication endpoints (signup, login, logout, password reset)
- **`/api/users`** - User profile and preferences
- **`/api/billing`** - Subscription and payment management
- **`/api/posts`** - Post CRUD operations
- **`/api/clients`** - Client management
- **`/api/assets`** - Asset upload and retrieval

### `/src/components` - React Components

Organized by feature domain, separated from UI library.

#### `/src/components/ui`
Shadcn UI components. Pre-built, reusable UI primitives.

#### `/src/components/auth`
Login, signup, password reset forms.

#### `/src/components/dashboard`
Dashboard layout, sidebar, top navigation, shared dashboard components.

#### `/src/components/onboarding`
Onboarding wizard and step components.

#### `/src/components/billing`
Pricing cards, subscription manager, invoice list.

#### `/src/components/posts`
Post editor, post list, post cards.

#### `/src/components/clients`
Client list, client form, invitation components.

### `/src/services` - Business Logic Layer

High-level business logic and data operations. Separation between API handlers and service layer ensures clean architecture.

- **`/services/auth`** - Authentication logic (signup, login, password reset)
- **`/services/billing`** - Billing operations (subscriptions, invoices)
- **`/services/users`** - User profile operations
- **`/services/posts`** - Post management
- **`/services/clients`** - Client management

### `/src/lib` - Low-Level Utilities

Infrastructure and low-level helpers.

- **`/lib/db`** - Supabase client configuration and database utilities
- **`/lib/auth`** - Authentication utilities and JWT handling
- **`/lib/services`** - External service integrations (Stripe, email, storage)
- **`/lib/utils.ts`** - General utility functions

### `/src/hooks` - Custom React Hooks

Reusable React hooks following React best practices.

- **`useAuth`** - Authentication context and utilities
- **`useFetch`** - Generic data fetching with loading/error states
- **`useLocalStorage`** - Synced state with localStorage
- **`useDebounce`** - Debounce values for optimization

### `/src/types` - TypeScript Definitions

Centralized TypeScript interfaces and types organized by feature.

- **`auth.types.ts`** - Auth-related types
- **`user.types.ts`** - User profile types
- **`billing.types.ts`** - Subscription and billing types
- **`post.types.ts`** - Post types
- **`client.types.ts`** - Client types
- **`asset.types.ts`** - Asset types
- **`common.types.ts`** - Shared types (Status, Plan, ApiResponse, etc.)

### `/src/validations` - Input Validation Schemas

Zod schemas for input validation across the application.

- **`auth.schema.ts`** - Signup, login, password reset validation
- **`user.schema.ts`** - User profile and preference validation
- **`post.schema.ts`** - Post creation and update validation
- **`client.schema.ts`** - Client management validation
- **`common.schema.ts`** - Shared schemas (pagination, status, plan)

### `/src/constants` - Application Constants

- **`routes.ts`** - All route paths (AUTH, DASHBOARD, API)
- **`config.ts`** - Application configuration (timeouts, limits, file sizes)
- **`feature-flags.ts`** - Feature flags for Sprint 1 (auth, billing enabled; analytics disabled)

### `/src/middleware` - Next.js Middleware

Global middleware for authentication, CORS, logging, etc.

## Key Architectural Patterns

### 1. Feature-Based Organization
Each feature (auth, billing, posts, etc.) has its own:
- API routes
- Components
- Services
- Types
- Validations

### 2. Layered Architecture
```
API Routes → Services → Library/Utilities → Database
   ↑           ↑            ↑
 Endpoints   Business     Infrastructure
             Logic
```

### 3. Type Safety
- Full TypeScript coverage
- Zod schemas for runtime validation
- Barrel exports for clean imports

### 4. Clean Separation of Concerns
- **Components** - UI only, no business logic
- **Services** - Business logic, data operations
- **Library** - Low-level utilities
- **Types** - Shared interfaces
- **Validations** - Input validation schemas

## Multi-Tenant SaaS Patterns

All major entities include `organizationId`:
- Posts
- Clients
- Assets
- Subscriptions
- Users (through roles)

This ensures data isolation between tenants.

## Sprint 1 Feature Flags

See `/src/constants/feature-flags.ts` for details:

✅ **Enabled:**
- Authentication (signup, login, password reset)
- Onboarding workflow
- Dashboard core
- Billing & Stripe integration
- Post management (with drafts)
- Client management
- Asset upload and storage

❌ **Disabled (Future Sprints):**
- Email verification (Sprint 2)
- Two-factor authentication (Sprint 2)
- Post scheduling (Sprint 2)
- Analytics (Sprint 2+)
- AI content generation (Phase 2)
- Social media publishing (Phase 3)

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
```

## Development Workflow

1. Create new feature branch
2. Create feature folder under appropriate domain
3. Create types in `/src/types`
4. Create validations in `/src/validations`
5. Create components in `/src/components`
6. Create services in `/src/services`
7. Create API routes in `/src/app/api`
8. Create pages in `/src/app/(dashboard)`

## Next Steps

1. Setup Supabase project and authentication
2. Implement database schema
3. Build auth flows (login, signup, password reset)
4. Create onboarding wizard
5. Implement billing with Stripe
6. Build dashboard core
7. Implement post management
8. Setup asset storage

---

This structure is designed for scalability, maintainability, and team collaboration.
