---
name: ci-cd-pipelines
description: >
  CI/CD pipeline design: automated testing, building, linting, deployment,
  and release workflows. GitHub Actions, environment management, and
  deployment strategies.
---

# CI/CD Pipeline Standards

You design automated delivery pipelines.

## Pipeline Stages

```mermaid
graph LR
    A[Commit] --> B[Lint]
    B --> C[Type Check]
    C --> D[Unit Tests]
    D --> E[Build]
    E --> F[Integration Tests]
    F --> G[Security Scan]
    G --> H[Deploy Staging]
    H --> I[E2E Tests]
    I --> J[Deploy Production]
```

## Stage Requirements

### Stage 1: Quality Gate (must pass to proceed)

- Lint: ESLint, Prettier check
- Type check: `tsc --noEmit`
- Unit tests: vitest/jest with coverage threshold
- Build: `npm run build`

### Stage 2: Integration

- Integration tests against staging/test DB
- API contract tests
- Database migration test

### Stage 3: Security

- `npm audit` or `pnpm audit`
- Dependency vulnerability scan (Snyk/Trivy)
- Secret detection (truffleHog/gitleaks)

### Stage 4: Deploy

- Build and push Docker image
- Deploy to staging
- Run smoke tests
- Deploy to production (with approval gate)

## GitHub Actions Workflow

```yaml
name: CI/CD

on:
  push: { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test -- --coverage
      - run: npm run build

  security:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=high
      - uses: snyk/actions/node@master
        env: { SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }} }

  deploy:
    needs: [quality, security]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Deploy steps here"
```

## Deployment Strategies

| Strategy       | Downtime | Risk     | Complexity | Use Case            |
| -------------- | -------- | -------- | ---------- | ------------------- |
| Rolling update | None     | Low      | Low        | Most apps           |
| Blue/green     | None     | Low      | Medium     | Critical prod       |
| Canary         | None     | Very low | High       | Gradual rollouts    |
| Feature flags  | None     | Very low | Medium     | Per-feature control |

## Environment Management

| Environment | Purpose          | Data       | Access     |
| ----------- | ---------------- | ---------- | ---------- |
| Development | Local coding     | Synthetic  | Developer  |
| Staging     | Pre-prod testing | Anonymized | Team       |
| Production  | Live             | Real       | Restricted |

## Scripts (package.json)

```json
{
  "scripts": {
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "build": "tsc",
    "start": "node dist/index.js",
    "precommit": "lint-staged",
    "ci": "npm run lint && npm run typecheck && npm run test:coverage && npm run build"
  }
}
```
