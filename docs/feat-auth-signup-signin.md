# Branch: feat/auth-signup-signin

## Purpose
Implement user authentication (Sign Up, Sign In) using Supabase Auth and Next.js Server Actions.

## Changes
- **Frontend**:
  - Added Supabase helpers:
    - `src/lib/supabase/client.ts` (Browser Client)
    - `src/lib/supabase/server.ts` (Server Client)
    - `src/lib/supabase/middleware.ts` (Session Refresh)
  - Added `middleware.ts` to protect routes and refresh sessions.
  - Created Auth Pages:
    - `/auth/sign-in`: Login form.
    - `/auth/sign-up`: Registration form.
    - `/auth/error`: Generic error page.
  - Created Server Actions (`src/app/auth/actions.ts`) for secure form handling.
  - Added `.env.example`.

## Usage
- Copy `.env.example` to `.env.local` and add Supabase credentials.
- Navigate to `/auth/sign-in` or `/auth/sign-up`.
