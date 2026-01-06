# Branch Documentation: chore/project-init

## Branch Purpose
Initialize the core project structure, including the Next.js frontend and NestJS backend, and set up essential dependencies like shadcn/ui and Supabase.

## Files Modified / Added
- `frontend/`: Next.js application structure.
- `backend/`: NestJS application structure.
- `GEMINI.md`: (Existing) Project rules and execution plan.
- `docs/chore-project-init.md`: This documentation file.

## Components/Services Added
### Frontend
- Next.js 16 (App Router)
- Tailwind CSS 4
- shadcn/ui base configuration
- UI Components: Button, Input, Card, Dialog, Label
- Supabase SDK (@supabase/supabase-js, @supabase/ssr)

### Backend
- NestJS 11
- Supabase SDK (@supabase/supabase-js)

## Testing Notes
- Verified that `frontend` and `backend` can be initialized and dependencies are installed.
- Basic build/lint checks can be run in respective directories.

## Architectural Decisions
- Used a split `frontend` and `backend` directory structure for clear separation of concerns.
- Standardized on npm as the package manager for both.
- Pre-installed core shadcn components to establish the UI baseline.
