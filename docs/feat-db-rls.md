# Branch: feat/db-rls

## Purpose
Secure the database using Row Level Security (RLS) policies.

## Changes
- **Database (Supabase)**:
  - Applied RLS policies to `public.users` and `public.materials`.
  - **Users**:
    - `student`: View/Update own profile.
    - `admin`: View all profiles.
  - **Materials**:
    - `student`: CRUD own materials only.
    - `admin`: CRUD all materials.

## Policy Logic
- Used `auth.uid()` to verify ownership.
- Used `EXISTS` subquery on `public.users` to verify `admin` role.

## Security Note
- Admin check relies on the `role` column in `public.users`.
- Policies prevent cross-user data access.
