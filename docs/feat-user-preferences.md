# Feature: User Preferences & Account Intelligence

## Purpose
Empower students and admins to customize their accessibility experience and view their institutional identity registry.

## Files Modified
- `frontend/src/app/layout.tsx`: Added zero-flicker theme initialization script.
- `frontend/src/app/globals.css`: Implemented High Contrast CSS variables.
- `frontend/src/components/user-nav.tsx`: Linked menu items to new routes.
- `frontend/src/components/audio-player.tsx`: Integrated dynamic playback speed.

## Components/Services Added
### Frontend
- `ProfilePage` (`/profile`): A high-fidelity dashboard for user identity metadata.
- `SettingsPage` (`/settings`):
  - `Appearance`: Contrast and Text Size scaling.
  - `Audio`: Neural synthesis speed control (0.5x - 2.0x).
  - `Security`: 2FA and Encryption flow visualization.
  - `Language`: Global linguistic interface selection.

## Architectural Decisions
- Used `localStorage` for client-side persistence of accessibility settings.
- Injected a blocking `<script>` in the `<head>` of the root layout to apply high-contrast and font-scaling immediately, preventing UI jumps during hydration.
- Decoupled `SettingsForm` into a client component while keeping the page server-rendered for initial metadata.

## Testing Notes
- Verified that voice synthesis speed correctly impacts the `AudioPlayer` component.
- Verified that "High Contrast" mode is readable and applies to all shadcn/ui components.
- Verified that students see "Admission ID" while admins see "Staff Token".
