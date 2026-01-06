# Branch: chore/ci-setup

## Purpose
Setup basic Continuous Integration (CI) and enforce code quality standards.

## Changes
- **Backend**:
  - Enforced `no-explicit-any` in ESLint.
  - Verified build and test scripts.
- **Frontend**:
  - Added `.prettierrc` for consistent formatting.
  - Verified build and lint scripts.
- **Root**:
  - Created `.github/workflows/ci.yml` for GitHub Actions.
    - Triggers on push/PR to master/main.
    - Steps: Install, Lint, Build, Test (backend).

## Testing
- Ran `npm run lint` and `npm run build` locally for both frontend and backend.
- Both passed successfully.
