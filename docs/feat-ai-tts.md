# Branch: feat/ai-tts

## Purpose
Enable Text-to-Speech (TTS) conversion for lecture materials and provide an accessible interface for students to listen to the content.

## Changes
- **Backend (NestJS)**:
  - `AiService`: Added `generateSpeech(text)` method (Mocked for now, returns a dummy buffer).
  - `MaterialsService`:
    - Integrated TTS into the processing pipeline.
    - Simplified text is converted to audio.
    - Audio is uploaded to Supabase Storage (`audio/{id}.mp3`).
    - DB updated with `audio_url`.
  - **Fixes**: Resolved linting issues (missing await, unsafe types) in backend services.

- **Frontend**:
  - `AudioPlayer`: Reusable component with Play/Pause, Seek, and Mute controls.
  - `MaterialDetailPage` (`/dashboard/material/[id]`):
    - Fetches material details.
    - Generates a signed URL for the audio file.
    - Displays Simplified Content and AI Summary side-by-side.
    - Integrates the Audio Player.

## Usage
1. Upload a file.
2. Wait for processing (simulated delay).
3. Click "View Content" on the dashboard card.
4. Listen to the audio or read the simplified text.

## Testing
- Verified TTS logic in backend (mock buffer creation).
- Verified Audio Player interactions.
- Build passed successfully.
