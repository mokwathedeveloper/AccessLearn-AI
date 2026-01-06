# Branch: feat/auth-roles

## Purpose
Implement utilities to fetch the authenticated user's role (`student` or `admin`) from the database.

## Changes
- **Frontend**:
  - `src/lib/auth/server.ts`: Server-side utility `getUserRole()` using cached React helper.
  - `src/lib/auth/client.ts`: Client-side hook `useUserRole()`.

## Logic
- Queries `public.users` table using the authenticated user's ID.
- Returns type-safe `UserRole`.

## Usage
- Server Components:
  ```ts
  import { getUserRole } from '@/lib/auth/server'
  const role = await getUserRole()
  ```
- Client Components:
  ```ts
  import { useUserRole } from '@/lib/auth/client'
  const { role, loading } = useUserRole()
  ```
