# AutoContent AI - Production-Ready SaaS Structure

## 📋 Quick Reference

### Project Overview
- **Type:** Scalable Multi-Tenant SaaS
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Supabase, Stripe
- **Sprint:** Foundation & Core Infrastructure Only
- **Status:** ✅ Production-Ready Folder Structure Complete

### What's Included ✅
- Authentication (signup, login, password reset)
- Onboarding workflow
- Dashboard core
- Billing & Stripe integration
- Post management (with drafts)
- Client management (agency)
- Asset management
- Multi-tenant architecture

### What's NOT Included (Future Phases) ❌
- AI content generation
- Social media integrations
- Publishing engine
- Analytics engine
- Email verification (Sprint 2)
- Two-factor authentication (Sprint 2)

---

## 📁 Directory Structure

```
AutoContent-AI/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth routes (public)
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   │
│   │   ├── (dashboard)/              # Protected routes
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── onboarding/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   ├── clients/page.tsx
│   │   │   ├── posts/page.tsx
│   │   │   ├── assets/page.tsx
│   │   │   └── README.md
│   │   │
│   │   ├── api/                      # API endpoints
│   │   │   ├── auth/                 # /api/auth/*
│   │   │   ├── users/                # /api/users/*
│   │   │   ├── billing/              # /api/billing/*
│   │   │   ├── posts/                # /api/posts/*
│   │   │   ├── clients/              # /api/clients/*
│   │   │   ├── assets/               # /api/assets/*
│   │   │   └── README.md
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (20+ components)
│   │   │
│   │   ├── auth/                     # Auth forms
│   │   │   ├── index.ts
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── PasswordResetForm.tsx
│   │   │
│   │   ├── dashboard/                # Dashboard layout
│   │   │   ├── index.ts
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopNav.tsx
│   │   │
│   │   ├── onboarding/               # Onboarding wizard
│   │   ├── billing/                  # Pricing & subscriptions
│   │   ├── posts/                    # Post management
│   │   ├── clients/                  # Client management
│   │   ├── README.md
│   │   └── index.ts (optional)
│   │
│   ├── services/                     # Business logic layer
│   │   ├── index.ts
│   │   ├── auth/
│   │   │   └── index.ts
│   │   ├── billing/
│   │   │   └── index.ts
│   │   ├── users/
│   │   │   └── index.ts
│   │   ├── posts/
│   │   │   └── index.ts
│   │   ├── clients/
│   │   │   └── index.ts
│   │   ├── README.md
│   │   └── ... (more as needed)
│   │
│   ├── lib/                          # Low-level utilities
│   │   ├── index.ts
│   │   ├── utils.ts                  # General utilities
│   │   ├── db/
│   │   │   └── index.ts              # Supabase client
│   │   ├── auth/
│   │   │   └── index.ts              # Auth utilities
│   │   ├── services/
│   │   │   └── index.ts              # External services
│   │   ├── README.md
│   │   └── ... (more as needed)
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── index.ts
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── README.md
│   │   └── ... (more as needed)
│   │
│   ├── types/                        # TypeScript definitions
│   │   ├── index.ts
│   │   ├── common.types.ts
│   │   ├── auth.types.ts
│   │   ├── user.types.ts
│   │   ├── billing.types.ts
│   │   ├── post.types.ts
│   │   ├── client.types.ts
│   │   ├── asset.types.ts
│   │   ├── README.md
│   │   └── ... (more as needed)
│   │
│   ├── validations/                  # Zod schemas
│   │   ├── index.ts
│   │   ├── common.schema.ts
│   │   ├── auth.schema.ts
│   │   ├── user.schema.ts
│   │   ├── post.schema.ts
│   │   ├── client.schema.ts
│   │   ├── README.md
│   │   └── ... (more as needed)
│   │
│   ├── constants/                    # Application constants
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   ├── config.ts
│   │   ├── feature-flags.ts
│   │   └── README.md
│   │
│   └── middleware/
│       └── index.ts
│
├── public/                           # Static assets
├── ARCHITECTURE.md                   # Detailed architecture guide
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── ... (other config files)
```

---

## 🏗️ Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────┐
│     React Components (UI Layer)     │
│  (presentational, no business logic)│
└────────────────────┬────────────────┘
                     │
┌────────────────────▼────────────────┐
│       Services (Business Logic)     │
│ (data operations, external APIs)    │
└────────────────────┬────────────────┘
                     │
┌────────────────────▼────────────────┐
│   Lib & Utilities (Infrastructure)  │
│   (DB clients, helpers, validators) │
└────────────────────┬────────────────┘
                     │
       ┌─────────────┴──────────────┐
       │                            │
    Database                  External Services
   (Supabase)               (Stripe, Email, etc)
```

### Data Flow

```
Next.js API Route
       ↓
Validate Input (Zod Schema)
       ↓
Services Layer
       ↓
Database/External Services
       ↓
Response to Client
```

### Feature-Based Organization

Each feature (Auth, Billing, Posts, etc.) has:
- **Types** - Data interfaces (`types/auth.types.ts`)
- **Validations** - Input schemas (`validations/auth.schema.ts`)
- **Services** - Business logic (`services/auth/index.ts`)
- **Components** - UI (`components/auth/index.ts`)
- **API Routes** - Endpoints (`app/api/auth/`)
- **Pages** - UI pages (`app/(dashboard)/...`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Stripe
STRIPE_PUBLIC_KEY=your_public_key
STRIPE_SECRET_KEY=your_secret_key
```

### 3. Supabase Setup
- Create Supabase project
- Setup authentication
- Create database schema
- Setup Row Level Security (RLS)

### 4. Stripe Setup
- Create Stripe account
- Configure webhook endpoints
- Setup pricing tiers

### 5. Start Development
```bash
npm run dev
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Comprehensive architecture guide |
| [src/types/README.md](./src/types/README.md) | Type definitions guide |
| [src/services/README.md](./src/services/README.md) | Services layer guide |
| [src/components/README.md](./src/components/README.md) | Components guide |
| [src/hooks/README.md](./src/hooks/README.md) | Hooks guide |
| [src/validations/README.md](./src/validations/README.md) | Validation schemas guide |
| [src/lib/README.md](./src/lib/README.md) | Utilities guide |
| [src/app/api/README.md](./src/app/api/README.md) | API routes guide |
| [src/constants/README.md](./src/constants/README.md) | Constants guide |

---

## 🎯 Key Architectural Patterns

### 1. Multi-Tenant SaaS
- All resources include `organizationId`
- Data isolation between tenants
- Role-based access control

### 2. Type Safety
- Full TypeScript coverage
- Zod runtime validation
- Type-safe API responses

### 3. Clean Separation of Concerns
- **Components** - UI only
- **Services** - Business logic
- **Lib** - Infrastructure
- **Types** - Data contracts
- **Validations** - Input validation

### 4. Scalable Structure
- Feature-based organization
- Barrel exports for clean imports
- Middleware for cross-cutting concerns

---

## 📝 Naming Conventions

- **Components**: PascalCase (`LoginForm.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Functions/Utils**: camelCase (`formatDate()`)
- **Types/Interfaces**: PascalCase (`User`, `Post`)
- **Constants**: UPPER_SNAKE_CASE (`ROUTES`, `CONFIG`)
- **Files**: lowercase with hyphens for multi-word (`auth-utils.ts`)

---

## ✅ Checklist for Development

### Before Starting Feature Development
- [ ] Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ ] Review feature-specific README files
- [ ] Check feature flags in [src/constants/feature-flags.ts](./src/constants/feature-flags.ts)

### For Each Feature
- [ ] Create types in `src/types`
- [ ] Create validations in `src/validations`
- [ ] Create service layer in `src/services`
- [ ] Create API routes in `src/app/api`
- [ ] Create components in `src/components`
- [ ] Create pages in `src/app/(dashboard)`
- [ ] Add constants if needed

---

## 🔐 Security Considerations

1. **Authentication**
   - Use Supabase auth
   - Implement JWT validation
   - Protect API routes

2. **Multi-Tenancy**
   - Always check organizationId
   - Implement Row Level Security (RLS)
   - Validate user permissions

3. **Input Validation**
   - Use Zod schemas
   - Validate on client AND server
   - Sanitize user input

4. **Environment Variables**
   - Keep secrets in `.env.local`
   - Use `NEXT_PUBLIC_` prefix for public vars only
   - Never commit secrets

---

## 🧪 Testing Strategy (Future)

```
src/
├── __tests__/
│   ├── api/
│   ├── services/
│   └── lib/
├── __mocks__/
└── ... (source files)
```

---

## 📈 Performance Optimization

- Use Next.js Image component
- Code splitting with dynamic imports
- Memoization for expensive computations
- Debouncing for search inputs
- Pagination for large datasets

---

## 🌐 API Response Format

### Success
```json
{
  "success": true,
  "data": { /* resource */ }
}
```

### Error
```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated
```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

---

## 🤝 Team Collaboration Guidelines

1. **Code Organization**
   - Follow feature-based structure
   - Use barrel exports for clean imports
   - Keep files focused and single-responsibility

2. **Type Safety**
   - Always use TypeScript types
   - Define interfaces before implementation
   - Avoid `any` types

3. **Code Quality**
   - Use ESLint rules
   - Format with Prettier
   - Write meaningful commit messages

4. **Documentation**
   - Add JSDoc comments for complex functions
   - Update README files when changing architecture
   - Keep constants documented

---

## 🎓 Next Steps

1. **Setup Development Environment**
   - Clone repository
   - Install dependencies
   - Configure environment variables

2. **Implement Core Features (Sprint 1)**
   - Authentication system
   - Onboarding flow
   - Dashboard core
   - Billing integration

3. **Testing & Validation**
   - Integration tests
   - E2E testing
   - Performance testing

4. **Deployment**
   - Configure CI/CD pipeline
   - Setup staging environment
   - Production deployment

---

## 📞 Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 📄 License

[Add your license here]

---

**Structure Created:** May 2026  
**Last Updated:** May 2026  
**Status:** ✅ Production-Ready
