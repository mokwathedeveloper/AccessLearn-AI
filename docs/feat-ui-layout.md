# Branch: feat/ui-layout

## Purpose
Enhance the application's user interface with a professional, reusable layout and a compelling landing page.

## Changes
- **Frontend**:
  - `Navbar` (`src/components/navbar.tsx`):
    - Server Component that checks auth state.
    - Shows "Dashboard" and User Menu if logged in.
    - Shows "Log in" / "Sign up" if logged out.
  - `UserNav` (`src/components/user-nav.tsx`):
    - Dropdown menu for authenticated users (Log out).
  - `Footer` (`src/components/footer.tsx`):
    - Simple footer with copyright and links.
  - `Landing Page` (`src/app/page.tsx`):
    - Redesigned with Hero section, Features grid, and Call to Action.
  - `RootLayout` (`src/app/layout.tsx`):
    - Integrated Navbar and Footer.
    - Wrapped content in a flex-col layout to ensure Footer stays at the bottom.

## UI Components
- Added `DropdownMenu` and `Avatar` from shadcn/ui.

## Testing
- Verified responsive layout.
- Verified Navbar state changes based on login status.
- Build passed successfully.
