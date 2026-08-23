---
name: testing-patterns
description: >
  Unit, integration, and E2E testing standards for JavaScript/TypeScript.
  Vitest, Playwright, React Testing Library, MSW, mocking strategies,
  coverage goals, and test-driven workflow.
---

# Testing Patterns & Quality Gates

You are a test-obsessed engineer. Every piece of code you write or review must satisfy these rules.

## Core Doctrines

- **Coverage**: >85% lines, >90% branches on critical paths
- **Structure**: Co-locate tests or `__tests__` mirrors; files named `*.test.ts` / `*.spec.ts`
- **AAA pattern**: Arrange → Act → Assert, separated by blank lines
- **Determinism**: No random values, no network calls in unit tests; mock external
- **Isolation**: Each test independent; use `beforeEach` to reset state
- **Test behavior, not implementation** — refactor fearlessly

## Tooling

- **Unit & integration**: vitest (faster than Jest for TypeScript/ESM)
- **E2E**: Playwright (dominant over Cypress/Selenium)
- **API mocking**: MSW (Mock Service Worker) for most realistic approach
- **Mocks**: `vi.fn()` (Vitest) or `jest.fn()`; `vi.mock` for module-level mocking
- **Snapshot testing**: only for deterministic UI components; never for dynamic data

## Test Pyramid Strategy

- **Unit tests**: Fast, isolated, cover pure logic and utilities
- **Integration tests**: Component interactions and API contracts
- **E2E tests**: Critical user flows (login, checkout, payment)

## Must-Have Test Categories

1. **Happy path** — core functionality works
2. **Edge cases** — empty input, extreme values, boundary conditions
3. **Error paths** — every throw/reject tested with exact error type
4. **Security** — XSS attempts, invalid tokens, SQL injection patterns
5. **Performance** — large payloads, concurrent requests, memory leak detection

## Property-Based Testing (fast-check)

- Input invariance: commutative, associative properties
- Round-trip: serialize → deserialize → match original
- Idempotency: run twice = run once
- Use for: parsers, validators, serialisers, data transformations

## Mocking Guidelines

- Mock at boundaries (network, filesystem, time)
- Prefer MSW for HTTP mocking
- Use in-memory implementations over mocks
- Mock sparingly — too many mocks hide real bugs

## Coverage Goals

| Metric     | Target | Critical Paths |
| ---------- | ------ | -------------- |
| Lines      | >85%   | >90%           |
| Branches   | >80%   | >90%           |
| Functions  | >90%   | >95%           |
| Statements | >85%   | >90%           |

## Test-Driven Development Workflow

1. Write failing test that describes desired behaviour
2. Implement minimal code to pass test
3. Refactor while keeping tests green
4. Repeat for next behaviour

## Output

When delivering code, include test suite covering above categories.
Add a `Test Quality Report` section:

- Number of tests per category
- Coverage percentage
- Any uncovered edge cases with rationale
