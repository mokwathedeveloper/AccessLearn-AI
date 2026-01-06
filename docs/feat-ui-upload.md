# Branch: feat/ui-upload

## Purpose
Create a reusable and accessible file upload component and integrate it into the Student Dashboard.

## Changes
- **Frontend**:
  - `src/components/file-upload.tsx`: A modular component for selecting files (PDF/TXT) with size validation and preview.
  - `src/app/dashboard/upload-section.tsx`: A client-side wrapper that manages the upload state and triggers the conversion process.
  - `src/app/dashboard/page.tsx`: Updated the dashboard to host the `UploadSection`.

## Features
- **Drag and Drop**: Supports both click-to-select and drag-and-drop.
- **Validation**: Limits file size to 10MB (configurable) and specific formats (PDF, TXT).
- **UX**: Visual feedback for selected files and clear-file functionality.
- **Accessibility**: Uses standard input labels and clear icons from `lucide-react`.

## Testing
- Verified component renders correctly in the dashboard.
- Verified file selection and size validation logic.
- Build passed successfully.
