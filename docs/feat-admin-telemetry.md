# Feature: Admin Telemetry & Registry Sync

## Purpose
Provide administrators with deep visibility into platform performance and tools to maintain data integrity across the database and storage.

## Files Modified
- `backend/src/app.module.ts`: Registered new modules and global interceptors.
- `backend/src/main.ts`: Updated CORS for cross-environment support.
- `frontend/src/app/admin/page.tsx`: Integrated real-time components.
- `supabase/migrations/20260106000009_performance_logs.sql`: Database schema for telemetry.

## Components/Services Added
### Backend
- `PerformanceInterceptor`: Global NestJS interceptor that tracks request duration and status.
- `RegistryModule`: Controller and Service for platform synchronization.
  - `syncUsers()`: Repairs missing user profiles.
  - `syncMaterials()`: Verifies physical file existence in storage.
  - `cleanupStuckMaterials()`: Resets timed-out processing jobs.

### Frontend
- `PerformanceLogs`: Real-time data stream component using Supabase Listeners.
- `SyncButton`: Interactive trigger for platform-wide synchronization.

## Architectural Decisions
- Used `SECURITY DEFINER` for the `is_admin()` helper to prevent RLS recursion.
- Implemented real-time subscriptions on the admin side to reduce manual refreshes.
- Applied atomic synchronization to ensure the "Intelligence Stream" always reflects the current system state.

## Testing Notes
- Verified that non-admins are blocked from accessing performance data.
- Verified that CORS policies correctly handle `localhost` and production Vercel origins.
- Pushed to `master` branch.
