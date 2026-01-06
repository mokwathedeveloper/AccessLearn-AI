# Branch: feat/db-users-roles

## Purpose
Initialize the database schema for User management and Role-Based Access Control (RBAC).

## Changes
- **Database (Supabase)**:
  - Created `public.app_role` ENUM (`student`, `admin`).
  - Created `public.users` table referencing `auth.users`.
  - Added `handle_new_user` function and trigger to automatically create a public profile on user signup.
  - Enabled RLS on `public.users` (policies to be added in `feat/db-rls`).

## Schema Details
```sql
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role public.app_role DEFAULT 'student',
  ...
);
```

## Testing
- SQL file verified for syntax.
- Trigger logic is standard Supabase pattern for `auth.users` integration.
