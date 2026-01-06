# Branch: feat/ai-voice-nav

## Purpose
Implement voice-controlled navigation to enhance accessibility for users with motor or visual impairments.

## Changes
- **Frontend**:
  - `VoiceNavigator` component (`src/components/voice-navigator.tsx`):
    - Uses the **Web Speech API** (`webkitSpeechRecognition`) to listen for commands.
    - Floating action button in the bottom-right corner.
    - Visual feedback (pulse animation) when listening.
    - Handles commands:
      - "Dashboard", "Home" -> Navigates to `/dashboard`.
      - "Upload" -> Navigates to dashboard (and scrolls to top).
      - "Back" -> Goes back in history.
  - `RootLayout` (`src/app/layout.tsx`):
    - Added `VoiceNavigator` globally so it's available on all pages.

## Constraints
- **Browser Support**: Depends on `webkitSpeechRecognition` (Chrome, Edge, Safari).
- **Security**: Requires microphone permission.

## Testing
- Verified component mounts only on client-side.
- Verified speech recognition start/stop logic.
- Build passed successfully.
