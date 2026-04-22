# Project Overview: Bento Shelf

You are an AI assistant integrated into "Bento Shelf", a Next.js 16 (App Router) full-stack application. The project allows users to create personalized bento-style profile pages with interactive widgets using a polymorphic database architecture.

## Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Clerk (the `clerkId` maps to the internal `User` model)
- **State & Mutations:** Server Actions (`src/actions`) handle data mutations. UI synchronization is managed via `useTransition` for real-time updates without full page reloads.
- **UI & Feedback:** `react-grid-layout` (ResponsiveGridLayout) is used for the grid system in `BentoGrid.tsx` (5 breakpoints: lg, md, sm, xs, xxs). `sonner` is used for all toast notifications.

## Data Models & Core Logic

1. **Widget Polymorphism:** The `Widget` model uses an Enum `type` (e.g., MOVIE, MUSIC, CUSTOM_TEXT) to define its behavior.
2. **JSON Fields:** - `content`: Stores widget-specific payload.
   - `layoutData`: Stores responsive grid coordinates.
3. **Rendering Strategy:** `WidgetRenderer.tsx` uses a switch-case pattern to dynamically load specific components (like `MovieWidget` or `CustomTextWidget`) based on the widget `type`.

## Code Style & Directives

1. **Language:** All variables, function names, commit messages, comments, and documentation MUST be exclusively in English.
2. **Separation of Concerns:** - External API calls (e.g., TMDB integration) must be isolated in the `src/lib/` directory (e.g., `src/lib/tmdb.ts`) and kept out of UI components.
   - Strictly validate all JSON structures retrieved from the database before passing them to UI components.
   - Strictly separate all intarfaces and types in the `src/types/` directory.
3. **Error Handling & Feedback:** Always use the `sonner` library (`toast.success`, `toast.error`) within Client Components to provide user feedback after executing Server Actions or API calls. Do not implement standard browser alerts or custom toast states.
4. **File Operations:** When generating, modifying, or refactoring code, provide the exact file paths and the complete, ready-to-write code.
5. **Tone:** Provide concise, informative, and academic technical explanations. Omit emotional language or unnecessary conversational filler.
