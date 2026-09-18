<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# UX With Motion — Project Guidelines

## 1. Brand & Identity
- **Visible Brand Text**: Always use `"UX With Motion"`. Never use `"UI With Motion"`, `"UIWithMotion"`, or `"Ux With Motion"`.
- **Technical Identifier**: Use `"UXWithMotion"` (or lowercase `uxwithmotion` in packages/URLs) where a single token or technical identifier is required.

## 2. Figma as the Visual Source of Truth
- **Visual Source of Truth**: Figma designs govern layout, typography, dimensions, spacing, colors, borders, radii, and shadows.
- **Figma MCP Usage**: Always inspect official desktop and mobile frames via Figma MCP before writing or updating UI code.
- **Faithful Implementation**: Do not redesign sections, improvise alternative layouts, or introduce page-specific visual hacks.
- **Design vs. Prototype**: Distinguish static appearance (layout, styling, tokens) from prototype motion (triggers, transitions, curves, timing).

## 3. Architecture & React Conventions
- **Server Components by Default**: Treat components as React Server Components (RSC) by default. Use `"use client"` only when client-side state, event handlers, browser APIs, or Framer Motion animations are strictly required.
- **Component Modularity**: Build reusable, composable components under `src/components/`. Keep components focused on a single responsibility.
- **Route Groups & Layouts**: Respect the Next.js App Router structure:
  - `(marketing)`: Public pages, landing pages, marketing layouts.
  - `(auth)`: Authentication views (e.g., `/login`).
  - Protected application routes: Keep separate with appropriate layout shells.
- **No Page-Specific Hacks**: Avoid inline style overrides or arbitrary ad-hoc classes that duplicate or bypass established design tokens and layout containers.

## 4. TypeScript & Code Quality Standards
- **Strict Typing**: Ensure all component props, utility functions, and Supabase data models have explicit TypeScript interfaces. Avoid `any`.
- **Validation**: Every change must pass:
  - `npx tsc --noEmit` (TypeScript validation)
  - `npm run lint` (ESLint verification)
  - `npm run build` (production build integrity)

## 5. Accessibility & Responsive Design
- **Accessibility**: Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`). Provide descriptive `aria-label`, `aria-busy`, and `aria-hidden` attributes where appropriate. Ensure proper focus states and keyboard navigation.
- **Responsive Behavior**: Ensure seamless responsiveness across desktop, tablet, and mobile breakpoints matching Figma specs. Avoid layout clipping, horizontal overflow, and unresponsive fixed dimensions.

## 6. Motion & Animation Standards
- **Purposeful Motion**: Use Framer Motion and Tailwind CSS transitions for subtle, polished micro-interactions and state changes.
- **Interaction Alignment**: Align hover, pressed, active, and idle states with design prototype specifications. Avoid disruptive or uncoordinated transitions.

## 7. Dependencies & Engineering Discipline
- **Minimal Dependencies**: Do not add unnecessary npm packages or external libraries. Rely on the existing verified tech stack (`Next.js`, `React`, `Tailwind CSS`, `Framer Motion`, `Lucide React`, `@supabase/ssr`).
- **Surgical Changes**: Make focused, incremental edits. Preserve existing comments, docstrings, and verified code unless changes are explicitly requested.
