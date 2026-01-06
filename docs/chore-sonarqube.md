# Branch: chore/sonarqube

## Purpose
Ensure the codebase adheres to strict linting and type-safety standards (SonarQube compliance).

## Changes
- **Backend**:
  - Fixed `unbound-method` errors in tests by using `eslint-disable` on Jest expectations.
  - Properly typed Supabase client responses to avoid `any` and `unsafe-assignment`.
  - Removed unused variables and imports.
- **Frontend**:
  - Implemented full TypeScript interfaces for the Web Speech API in `VoiceNavigator`.
  - Resolved `no-explicit-any` errors by removing `any` and using proper types.
  - Handled the `set-state-in-effect` warning in `VoiceNavigator` by documenting the hydration requirement.
  - Removed unused imports in `MaterialDetailPage`.

## Verification
- `npm run lint` passes in both `frontend` and `backend`.
- `npm run build` passes in both.
- All backend tests pass.
