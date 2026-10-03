<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# UX With Motion — Project Guidelines

## 1. Brand & Identity

- **Visible Brand Text**: Always use `"UX With Motion"`.
- Never use `"UI With Motion"`, `"UIWithMotion"`, or `"Ux With Motion"` as visible brand text.
- **Technical Identifier**: Use `"UXWithMotion"` (or lowercase `uxwithmotion` in packages/URLs) where a single token or technical identifier is required.
- Do not rename or reinterpret the visible brand for convenience.

## 2. Figma as the Visual Source of Truth

- **Primary Visual Source of Truth**: Figma governs the visual design of the product, including layout, typography, dimensions, spacing, colors, borders, radii, shadows, and responsive behavior.
- **Figma MCP**: For UI work based on existing Figma designs, inspect the relevant official desktop/mobile frames through Figma MCP before implementing or substantially updating the UI.
- **Faithful Implementation by Default**: For the public website and other established designed experiences, do not arbitrarily redesign sections, replace layouts, or introduce page-specific visual hacks when the Figma design already provides the intended solution.
- **Admin Component Builder Exception**: The Admin Component Builder's Create/Edit workflow is intentionally allowed to evolve beyond the exact Figma draft. Figma remains the visual reference and starting point, but implementation may improve the workflow, information hierarchy, interaction model, responsiveness, or usability when the change is objectively useful for the product and consistent with the overall design system.
- **Scope of Builder Freedom**: This flexibility applies specifically to the Admin Component Builder Create/Edit workflow. It does not authorize unrelated redesigns elsewhere in the product.
- **Design vs. Prototype**: Distinguish static appearance (layout, styling, tokens) from prototype behavior (triggers, transitions, curves, timing). Do not assume prototype behavior must always be reproduced literally when the implementation requires a better equivalent.
- **Design Gaps**: When Figma is incomplete, ambiguous, exploratory, or does not cover an implementation state, use the existing design system and choose the simplest coherent solution rather than inventing an unrelated visual language.
- **Do Not Change Architecture for Visual Reasons**: Visual improvements must not unnecessarily alter established application architecture, data contracts, security boundaries, or backend behavior.

## 3. Architecture & React Conventions

- **Server Components by Default**: Treat components as React Server Components (RSC) by default. Use `"use client"` only when client-side state, event handlers, browser APIs, or Framer Motion animations are genuinely required.
- **Component Modularity**: Build reusable, composable components under `src/components/`. Keep components focused on a single responsibility.
- **Route Groups & Layouts**: Respect the Next.js App Router structure and the existing route organization:
  - `(marketing)`: Public pages and marketing experiences.
  - `(auth)`: Authentication views such as `/login`.
  - Protected application/admin routes: keep appropriate protected layout shells.
- **No Page-Specific Hacks**: Avoid arbitrary inline styles, duplicated ad-hoc classes, or one-off layout hacks that bypass established design tokens and reusable primitives.
- **Preserve Verified Architecture**: Do not replace or redesign an already-verified architecture unless a concrete functional, security, performance, or maintainability problem is identified.
- **Security Boundaries**: Never reintroduce arbitrary code execution, unsafe source rewriting, or other behavior that has previously been removed for security reasons.

## 4. TypeScript & Code Quality Standards

- **Strict Typing**: All new or materially modified component props, utility functions, and Supabase data models should have explicit TypeScript types/interfaces.
- **Avoid `any`**: Do not introduce new `any` usage. Do not expand the scope of a focused task merely to clean up unrelated legacy `any` usages unless explicitly requested.
- **Validation**: Run, where applicable:
  - `npx tsc --noEmit`
  - `npm run lint`
  - `npm run build`
- **Validation Reporting**: Do not hide failures. Distinguish clearly between:
  - errors introduced by the current change,
  - pre-existing repository issues,
  - dependency/version issues,
  - and local environment/toolchain issues.
- **No Unnecessary Dependency Growth**: Add a dependency only when the existing verified stack cannot reasonably support the requirement and the dependency has a clear justification.

## 5. Accessibility & Responsive Design

- **Accessibility**: Use semantic HTML5 elements where appropriate. Provide accessible names, labels, focus states, keyboard interaction, and meaningful ARIA attributes when needed. Do not add ARIA attributes mechanically when native semantics already provide the behavior.
- **Responsive Behavior**: Ensure desktop, tablet, and mobile layouts remain usable and consistent with the established design direction.
- **No Broken Fixed Layouts**: Avoid clipping, horizontal overflow, inaccessible controls, or fixed dimensions that break at supported viewport sizes.
- **Builder Responsiveness**: The Admin Component Builder may use a layout that differs from the Figma draft when required for usability, provided it remains visually consistent with the Admin design system.

## 6. Motion & Animation Standards

- **Purposeful Motion**: Use Framer Motion and Tailwind transitions for subtle, useful micro-interactions and state changes.
- **Interaction Alignment**: Where Figma prototype behavior is available, use it as the reference for hover, pressed, active, loading, and transition states.
- **Do Not Over-animate**: Motion should communicate state or hierarchy rather than distract from the task.
- **Existing Deferred Motion Work**: Do not reopen previously deferred exact motion extraction/refinement unless explicitly requested.

## 7. Dependencies & Engineering Discipline

- **Verified Stack**: Prefer the existing verified stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Lucide React
  - `@supabase/ssr`
  - Supabase
- **Surgical Changes**: Make focused, incremental edits. Preserve verified behavior and existing comments/docstrings unless there is a concrete reason to change them.
- **No Unrelated Refactors**: Do not combine unrelated cleanup, redesign, dependency upgrades, or architecture changes with the current task.
- **Respect Existing Product Decisions**: Do not redo completed work merely because an alternative approach is possible.
- **Builder Evolution**: The Admin Component Builder may evolve iteratively as functionality and UX are validated; improve the workflow where necessary rather than treating an exploratory Figma draft as an immutable specification.