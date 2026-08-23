---
name: documentation
description: >
  Documentation standards: README structure, API documentation, inline
  comments, changelogs, architecture decision records, and technical
  writing guidelines.
---

# Documentation Standards

## README Structure

````markdown
# Project Name

## Overview

(2-3 sentences — what the project is and why it exists)

## Quick Start

```bash
npm install
cp .env.example .env  # Configure environment
npm run dev
```
````

## Usage

(Basic usage examples)

## API Reference

(Key endpoints, functions, types — auto-generated where possible)

## Configuration

| Env Variable | Default | Description                |
| ------------ | ------- | -------------------------- |
| DATABASE_URL | -       | Postgres connection string |

## Development

### Setup

### Testing: `npm test`

### Building: `npm run build`

## Deployment

### Docker

### CI/CD

## Architecture

(Component overview, data flow — ASCII or Mermaid diagram)

## Contributing

### PR Process

### Coding Standards

## License

MIT

````

## JSDoc Standards

```typescript
/**
 * Description of what this function does — include WHY not just WHAT.
 *
 * @param userId - The user's unique identifier
 * @param options - Configuration options
 * @param options.includeInactive - Whether to include inactive records
 * @returns The formatted user profile
 * @throws {NotFoundError} When user doesn't exist
 * @throws {ValidationError} When userId is invalid
 * @example
 * ```ts
 * const profile = await getUserProfile('123');
 * // => { name: 'Alice', email: 'alice@example.com' }
 * ```
 */
````

## Changelog Format (Keep a Changelog)

```markdown
# Changelog

## [Unreleased]

### Added

- New feature A

### Changed

- Updated dependency X to v2

### Fixed

- Bug in component Y

## [1.0.0] - 2026-01-15

### Added

- Initial release
```

## Architecture Decision Records

```markdown
# ADR-001: Use Zod for Validation

## Status

Accepted

## Context

We need runtime validation for API inputs that provides TypeScript type inference.

## Decision

Use Zod for all runtime validation. It provides:

- TypeScript type inference from schemas
- Composable schema building
- Custom error messages
- Small bundle size (~8KB)

## Consequences

- - Type safety at runtime and compile time
- - Single source of truth for types and validation
- - Learning curve for team on Zod-specific features

## Alternatives Considered

- Yup: larger bundle, less TypeScript integration
- Joi: runtime-only, no TS inference
- io-ts: more complex, steeper learning curve
- Manual validation: error-prone, no type inference
```

## Documentation Quality Checklist

- [ ] README exists with overview, setup, and usage
- [ ] API docs describe all public endpoints/functions
- [ ] Public functions have JSDoc with @param/@returns/@throws
- [ ] Configuration documented (env vars)
- [ ] Changelog maintained
- [ ] Architecture decisions documented (ADRs)
- [ ] Code examples are runnable and tested
- [ ] No broken links
- [ ] Consistent voice and terminology
- [ ] Version numbers match actual release
