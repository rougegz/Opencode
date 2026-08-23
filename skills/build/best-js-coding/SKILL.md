---
name: best-js-coding
description: >
  Production-grade JS/TS engineering — maximum parallelism, full MCP/plugin
  arsenal, aggressive sub-agent dispatch, context-rich planning, zero-debt code.
---

# Best JS Coding — Production Engineering

## 0. CORE PRINCIPLE

**Launch 5+ parallel specialized sub-agents before writing a single line.**
Never work alone. Every task is a coordinated strike team.

## 1. ALWAYS-ON PARALLEL DISPATCH

For ANY non-trivial task, IMMEDIATELY launch in parallel:

1. `architect` — design review, pattern selection, data flow, component split
2. `explorer` — full codebase mapping, existing patterns, imports, conventions
3. `researcher` — library comparison, deprecation check, security advisories,
   best practices
4. `planner` — task decomposition, dependency graph, effort estimate, sequencing

Then after context gathered:

1. `builder` × N (1 per independent component) — implementation
2. `tester` — tests, coverage, edge cases (parallel with builder where possible)
3. `reviewer` — correctness, security, performance, style review
4. `security` — full audit: injection, secrets, deps, OWASP top 10
5. `debugger` — squash any issues found
6. `documenter` — docs, JSDoc, changelog

Use `delegate()` for all sub-agent launches. Never implement solo.

## 2. FULL ARSENAL — Every Tool, Plugin, MCP

| Category   | Asset                  | When to use                                            |
| ---------- | ---------------------- | ------------------------------------------------------ |
| **MCP**    | `ast-lens`             | Symbols, references, call graphs, complexity           |
| **MCP**    | `playwright`           | Browser automation, DOM inspection, E2E verification   |
| **MCP**    | `github`               | PRs, issues, code search, repository management        |
| **Plugin** | `vibeguard`            | Detect incorrect assumptions before costly mistakes    |
| **Plugin** | `worktree`             | Isolate parallel agents touching overlapping files     |
| **Plugin** | `scheduler`            | Schedule recurring tasks, monitoring, cron jobs        |
| **Plugin** | `background-agents`    | Fire-and-forget long-running work                      |
| **Skill**  | `testing-patterns`     | Vitest, Playwright, MSW, coverage goals, TDD           |
| **Skill**  | `error-handling`       | Custom errors, Result types, graceful degradation      |
| **Skill**  | `api-design`           | REST/GraphQL resource naming, versioning, OpenAPI      |
| **Skill**  | `database-engineering` | Schema, migrations, query optimization, Prisma/Drizzle |
| **Tool**   | `delegate()`           | Launch ANY sub-agent in background                     |
| **Tool**   | `todowrite()`          | Track multi-step progress visibly                      |
| **Tool**   | `question()`           | Ask user when ambiguity cannot be resolved             |
| **Tool**   | `skill()`              | Load domain skill before every task                    |

## 3. MAXIMUM CONTEXT — Gather Before Code

Before ANY implementation, gather:

1. **Codebase map** — `explorer` sub-agent, full import graph, existing patterns
2. **Architecture review** — `architect` sub-agent, fit with existing design
3. **Dependency audit** — `researcher` sub-agent, latest versions, alternatives
4. **Security posture** — `security` sub-agent, threat model for this task
5. **Test infrastructure** — existing test setup, coverage gaps
6. **Config & conventions** — tsconfig, eslint, prettier, biome, package.json
   scripts

**Only then** produce a plan. Never guess the context.

## 4. PRODUCTION-GRADE CODE RULES

### 4.1 Structure & Hygiene

- Named exports only, one component per file, kebab-case filenames
- Barrel `index.ts` for clean public API surface
- Business logic NEVER imports framework code
- Config validated by Zod at process entry, never hardcoded
- `.env` / `.env.example` with all variables documented

### 4.2 Modern JS/TS (ES2024+)

- `?.` `??` `??=` `||=` for null safety
- `Object.groupBy()`, `Map.groupBy()`, `Set.union()`, `Array.at()`
- `Promise.withResolvers()`, top-level await
- `structuredClone()` for deep copies, never `JSON.parse(JSON.stringify())`
- `AbortController` + `AbortSignal` on every async operation
- `for await...of` for streams and async iterables
- `using` / `await using` (TC39 stage 3) for disposables

### 4.3 Functional Core

- Pure functions by default, isolate side effects in thin wrappers
- `pipe`/`compose` for transformations, native `.reduce` or tiny utilities
- Avoid `class` — factory functions, closures, plain objects
- Immutable updates: spread, `structuredClone`, or Immer
- `neverthrow` Result type for expected failures

### 4.4 Async Excellence

- `Promise.allSettled` for partial-failure-tolerant parallel work
- `p-limit` or `bottleneck` for concurrency throttling
- AbortController + signal forwarding on EVERY fetch/stream
- Event listener cleanup: `{ once: true }`, `AbortSignal`, or `finally`
- Never mix `.then()` and `await` — one style, `async/await`

### 4.5 Error Handling

- Custom error classes: `AppError`, `NotFoundError`, `ValidationError`
- Result/Either pattern at domain boundaries
- Globally catch `unhandledrejection` + `uncaughtException`
- Zod at EVERY external boundary — API, file, env, user input
- Never leak stack traces to clients
- Structured logging (pino or similar) with correlation IDs

### 4.6 Performance

- Memoization: `WeakMap`, `memoizee`, or `useMemo` (React)
- Debounce/throttle for DOM/user events
- Lazy evaluation with generators for large sequences
- Worker threads / Web Workers for CPU-bound work
- Event-loop awareness — never block with sync heavy ops
- Bundle analysis, tree-shaking, code splitting
- Query optimization: N+1 detection, index review, `EXPLAIN ANALYZE`

### 4.7 Security

- Zero `eval`, `new Function`, `innerHTML`, shell injection vectors
- Input sanitization at every user boundary
- `helmet`, CORS, rate limiting on all HTTP endpoints
- CSP headers, CSRF tokens where applicable
- `npm audit` in CI, dependabot/renovate configured
- Secrets: never log, never commit, environment variables only
- Zod validation before any database write
- SQL injection prevention (parameterized queries or ORM)

### 4.8 Testing

- TDD for critical logic — test before implementation
- Vitest as primary runner, Playwright for E2E
- MSW for API mocking, in-memory DB for integration tests
- > 90% coverage on business logic, 100% on error paths
- Test behaviour, not implementation — refactor freely
- Edge case testing: empty states, error states, race conditions, timeouts
- Mutation testing (stryker) for test quality validation

## 5. QUALITY GATES — Iterate Until GREEN

Every change MUST pass, in order:

1. **Lint** — biome check or eslint --max-warnings 0
2. **Type check** — tsc --noEmit --strict
3. **Unit tests** — vitest run --coverage
4. **Integration tests** — vitest run --config vitest.integration.ts
5. **E2E tests** — playwright test (if applicable)
6. **Build** — tsc --build or vite build
7. **Review** — launch `reviewer` + `security` sub-agents
8. **Dependency check** — npm audit --level=high

If ANY gate fails → launch `debugger` sub-agent before retrying. Repeat until
all green. Do not stop early.

## 6. SCOPE DISCIPLINE

- One task, one change. Bug fix ≠ refactoring.
- No speculative error handling — handle only real failures.
- No speculative abstraction — wait for 3+ repetitions.
- No speculative performance optimization — measure first.
- If scope grows → pause, re-plan, get approval.

## 7. CLOSE

1. Update **CHANGELOG.md** — what changed
2. Launch `documenter` to update README/docs if API surface changed
3. Record durable decisions in the project's own docs (README, ADRs)
