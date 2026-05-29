# Agency Clients Feature

## Purpose

Manages agency clients for multi-client workflows:
- Create/manage clients
- Client invitations
- Client access control
- Client-specific content
- Permissions management

## Structure

```
agency-clients/
├── components/          # Clients UI
│   ├── ClientList.tsx
│   ├── ClientForm.tsx
│   ├── ClientCard.tsx
│   ├── ClientInvitation.tsx
│   └── index.ts
├── pages/               # Clients pages
│   ├── page.tsx
│   ├── [id]/page.tsx
│   └── new/page.tsx
├── api/                 # Clients API
│   ├── route.ts         # GET, POST
│   ├── [id]/route.ts    # GET, PUT, DELETE
│   └── invite/route.ts
├── services/            # Clients logic
│   ├── index.ts
│   └── clientsService.ts
├── types/               # Clients types
│   ├── index.ts
│   └── client.types.ts
├── validations/         # Clients schemas
│   ├── index.ts
│   └── client.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
export type ClientRole = 'viewer' | 'editor' | 'admin';

export interface Client {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  contactPerson?: string;
  website?: string;
  industry?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: Date;
}

export interface ClientAccess {
  id: string;
  organizationId: string;
  clientId: string;
  userId: string;
  role: ClientRole;
  grantedAt: Date;
}

export interface ClientInvitation {
  id: string;
  organizationId: string;
  clientId: string;
  email: string;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
}
```

## Services

```typescript
export const clientsService = {
  createClient: async (orgId: string, data: ClientData) => {},
  updateClient: async (clientId: string, data: Partial<ClientData>) => {},
  deleteClient: async (clientId: string) => {},
  getClients: async (orgId: string) => {},
  getClientById: async (clientId: string) => {},
  inviteToClient: async (clientId: string, email: string, role: ClientRole) => {},
  acceptInvitation: async (token: string) => {},
  removeAccess: async (accessId: string) => {},
};
```

## Components

```typescript
// ClientList - Display all clients
export default function ClientList({ clients }) {}

// ClientForm - Create/edit client
export default function ClientForm({ initialData }) {}

// ClientCard - Single client
export default function ClientCard({ client }) {}

// ClientInvitation - Invite client
export default function ClientInvitation({ clientId }) {}
```

## API Routes

```
GET    /api/clients                 # List clients
POST   /api/clients                 # Create client
GET    /api/clients/:id             # Get client
PUT    /api/clients/:id             # Update client
DELETE /api/clients/:id             # Delete client

POST   /api/clients/:id/invite      # Send invitation
GET    /api/clients/invite/:token   # Accept invitation
```

## Access Control

```typescript
// Grant access to client
export interface ClientAccess {
  clientId: string;
  userId: string;
  role: 'viewer' | 'editor' | 'admin';
}

// Check permission
export async function canViewClient(userId: string, clientId: string) {
  const access = await getClientAccess(userId, clientId);
  return !!access && access.role !== 'none';
}
```

## Usage

```typescript
import { ClientList } from '@/features/agency-clients/components';
import { clientsService } from '@/features/agency-clients/services';

// List clients
const clients = await clientsService.getClients(orgId);

// Invite client
await clientsService.inviteToClient(clientId, email, 'editor');
```

## Feature Flags

```typescript
FEATURES.CLIENTS = {
  ENABLED: true,
  INVITATIONS: true,
  SHARING: true,
  PERMISSIONS: true,
}
```

## Future Enhancements

- [ ] Client-specific dashboards
- [ ] Client branding
- [ ] Client billing separation
- [ ] Team role hierarchy
- [ ] Audit logs
- [ ] Usage isolation
