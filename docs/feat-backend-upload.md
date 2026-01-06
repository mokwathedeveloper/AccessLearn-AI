# Branch: feat/backend-upload

## Purpose
Integrate file uploads with Supabase Storage and persist metadata in the database.

## Changes
- **Database (Supabase)**:
  - `supabase/migrations/20260106000003_storage_setup.sql`:
    - Created `lecture-materials` private bucket.
    - Set up RLS policies to restrict users to their own folders (`{user_id}/*`).
    - Allowed Admins to view all materials.
- **Frontend**:
  - `src/app/dashboard/upload-section.tsx`:
    - Integrated Supabase Browser Client.
    - Implemented `handleUpload` to:
      1. Upload file to Storage in a user-specific folder.
      2. Insert record into `materials` table with the resulting file path.
    - Added error handling and visual feedback.

## Security
- **Path Isolation**: Users can only upload and read files within a folder named after their `auth.uid()`.
- **Private Bucket**: Files are not publicly accessible via URL.

## Testing
- Verified Supabase Storage API integration logic.
- Build passed successfully.
