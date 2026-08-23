---
name: frontend
description: >
  Frontend development patterns: React/Next.js, component design, state
  management, styling, accessibility, and performance optimization for
  web applications.
---

# Frontend Development Standards

## Component Architecture

### Component Types

| Type    | Description                | Example                           |
| ------- | -------------------------- | --------------------------------- |
| Page    | Route-level, data fetching | `UsersPage`, `SettingsPage`       |
| Feature | Domain-specific, reusable  | `UserList`, `OrderForm`           |
| UI      | Generic, reusable          | `Button`, `Modal`, `Input`        |
| Layout  | Structural, composition    | `Sidebar`, `Header`, `MainLayout` |

### Rules

- One component per file, named export only
- Props interface exported alongside component
- Components are pure (same props → same output)
- Side effects in hooks/callbacks, not in render
- Composition over prop drilling

## State Management

| State Type   | Location        | Tool                            |
| ------------ | --------------- | ------------------------------- |
| Server state | Server cache    | TanStack Query / SWR            |
| URL state    | URL params      | Next.js router, useSearchParams |
| Form state   | Local form      | React Hook Form + Zod           |
| UI state     | Local component | useState, useReducer            |
| Global state | Shared store    | Zustand (preferred) or Jotai    |

## Styling Approach

- Tailwind CSS for utility-first styling
- CSS Modules for complex component styles
- CSS variables for theming
- No CSS-in-JS runtime (performance)
- Responsive design: mobile-first breakpoints

## Accessibility (a11y)

- Semantic HTML (nav, main, article, button, etc.)
- ARIA labels where semantic HTML insufficient
- Keyboard navigation: tab order, focus management
- Color contrast: AA minimum, AAA preferred
- Screen reader testing

## Performance

- Dynamic imports for route-level code splitting
- Image optimization (next/image)
- Bundle analysis (webpack-bundle-analyzer)
- Memoization (useMemo, useCallback) only with measured benefit
- Virtual lists for large data sets

## Testing

- Unit: vitest + @testing-library/react
- Integration: Test complete user flows
- E2E: Playwright for critical paths
- Accessibility: jest-axe or @axe-core/playwright
