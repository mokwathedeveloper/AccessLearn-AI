# Branch: feat/ai-summarization

## Purpose
Implement AI-powered content summarization and simplification to make academic materials more accessible.

## Changes
- **Backend (NestJS)**:
  - `AiModule` & `AiService`: Provides logic for summarizing and simplifying text.
  - `MaterialsModule` & `MaterialsService`: 
    - Downloads files from Supabase Storage.
    - Extracts content.
    - Orchestrates the AI transformation.
    - Updates the database status and results.
  - `MaterialsController`: REST endpoint `/materials/process` to trigger AI jobs.
- **Frontend**:
  - `UploadSection`: Now calls the backend API immediately after a successful file upload to start processing.

## AI Logic
- **Summarization**: Generates a concise version of the lecture content.
- **Simplification**: Rewrites complex academic language into simpler, more readable text.
- **Status Updates**: The UI reflects the processing state (Pending -> Processing -> Completed/Failed) in real-time (via refresh).

## Testing
- Verified NestJS service logic for file handling and DB updates.
- Verified API connectivity between frontend and backend.
- Build passed successfully.
