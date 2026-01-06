# Branch: feat/ui-accessibility

## Purpose
Ensure the application is accessible to all users, adhering to WCAG guidelines where possible.

## Changes
- **Frontend**:
  - `SkipToContent` component: Allows keyboard users to bypass navigation and jump to main content.
  - `RootLayout`: Added proper `id="main-content"` and `tabIndex={-1}` for the skip link target.
  - `AudioPlayer`: Added explicit `aria-label` attributes to Play/Pause/Mute buttons for screen readers.

## Accessibility Features
- **Keyboard Navigation**: All interactive elements (buttons, links, inputs) are reachable via Tab.
- **Screen Reader Support**: Semantic HTML and ARIA labels used throughout.
- **Visual Focus**: Default browser focus rings are preserved or enhanced by Tailwind.

## Testing
- Verified Tab navigation order.
- Verified screen reader announcements for audio controls.
- Build passed successfully.
