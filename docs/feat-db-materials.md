# Branch: feat/db-materials

## Purpose
Create the `materials` table to store lecture content and its AI-generated derivatives.

## Changes
- **Database (Supabase)**:
  - Created `public.material_status` ENUM (`pending`, `processing`, `completed`, `failed`).
  - Created `public.materials` table.
    - Fields: `title`, `file_url`, `file_type`, `status`.
    - AI Output Fields: `audio_url`, `summary`, `simplified_content`.
    - FK: `uploaded_by` references `public.users(id)`.
  - Added Index on `uploaded_by`.
  - Enabled RLS.

## Schema Details
```sql
CREATE TABLE public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploaded_by UUID REFERENCES public.users(id),
  status public.material_status DEFAULT 'pending',
  ...
);
```
