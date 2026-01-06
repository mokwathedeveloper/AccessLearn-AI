# Branch: feat/auth-protection

## Purpose
Implement server-side Role-Based Access Control (RBAC) to protect pages and API routes.

## Changes
- **Frontend**:
  - `src/lib/auth/server.ts`: Added `requireRole(role)` function.
    - Redirects to `/auth/sign-in` if not logged in.
    - Redirects to `/` if logged in but role mismatch.
  - `src/app/dashboard/page.tsx`: Protected route for `student`.
  - `src/app/admin/page.tsx`: Protected route for `admin`.

## Usage
In any Server Component (Page or Layout):
```tsx
import { requireRole } from '@/lib/auth/server'

export default async function ProtectedPage() {
  await requireRole('admin') // Will redirect if not admin
  return <div>Admin Content</div>
}
```

## Security
- Logic runs on the server.
- Redirects happen before rendering sensitive content.
- Supabase RLS policies (Database layer) still serve as the ultimate source of truth for data access.
