# Branch: feat/ui-materials-list

## Purpose
Display a list of uploaded lecture materials with their processing status on the student dashboard.

## Changes
- **Frontend**:
  - `src/components/ui/badge.tsx`: Added a new UI component for status labels.
  - `src/app/dashboard/materials-list.tsx`:
    - Server Component that fetches user-specific materials from Supabase.
    - Displays materials in a responsive grid using Cards.
    - Includes conditional rendering for AI features (Audio/Insights) based on their availability in the DB.
    - Uses `StatusBadge` to show "Pending", "Processing", "Ready", or "Failed".
  - `src/app/dashboard/page.tsx`:
    - Integrated `MaterialsList` with React `Suspense` for a better loading experience.

## UI Details
- **Empty State**: Friendly illustration/message when no materials exist.
- **Loading State**: Spinner shown during initial data fetch.
- **Responsive**: Grid adapts from 1 to 3 columns based on screen size.

## Testing
- Verified data fetching logic from Supabase.
- Verified conditional rendering of status badges.
- Build passed successfully.
