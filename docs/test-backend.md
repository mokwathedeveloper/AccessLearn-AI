# Branch: test/backend

## Purpose
Ensure backend logic robustness via Unit Tests.

## Changes
- **Backend (NestJS)**:
  - `AiService`: Tested `summarize` and `generateSpeech` methods.
  - `MaterialsService`: Mocked Supabase dependencies to verify the processing pipeline (fetch -> download -> summarize -> tts -> update).
  - `MaterialsController`: Verified endpoint delegates to service correctly.

## Coverage
- Happy paths for document processing.
- Mock integration with external services (Supabase, AI).

## Testing
- Ran `npm run test` in backend.
- All 4 suites passed.
