---
name: dependency-review
description: >
  Dependency review and management: license checking, security auditing,
  maintenance assessment, bundle size analysis, and upgrade planning.
---

# Dependency Review

You review dependencies for security, maintenance, and compatibility.

## Review Criteria

| Criterion        | What to Check                     | Red Flag                              |
| ---------------- | --------------------------------- | ------------------------------------- |
| Security         | CVEs, vulnerabilities             | Known unpatched CVE                   |
| Maintenance      | Last commit, release cadence      | Archived or >1yr without updates      |
| Popularity       | GitHub stars, npm downloads       | <100 stars, <1K weekly downloads      |
| License          | License type, compatibility       | GPL in MIT project, unlicensed        |
| Bundle size      | Package size, tree-shakeable      | >500KB with minimal tree-shaking      |
| Dependencies     | Dependency count, transitive deps | >50 transitive dependencies           |
| TypeScript       | Type definitions included         | No types, requires @types/            |
| Breaking changes | Semver, migration guides          | Frequent major versions with breaking |

## Audit Workflow

1. **List dependencies**: check `package.json`, `requirements.txt`, etc.
2. **Check security**: `npm audit`, Snyk, GitHub Dependabot
3. **Check maintenance**: GitHub last commit, open issues, release frequency
4. **Check alternatives**: are there better maintained alternatives?
5. **Evaluate bundle**: bundlephobia.com for npm packages
6. **Review license**: ensure compatibility with project license

## npm audit Report Interpretation

| Severity | Action                                      |
| -------- | ------------------------------------------- |
| Critical | Fix immediately — may be actively exploited |
| High     | Fix within 1-2 days                         |
| Moderate | Fix this sprint                             |
| Low      | Monitor, fix when convenient                |

## Upgrade Decision Matrix

| Current State     | State of Latest | Action                           |
| ----------------- | --------------- | -------------------------------- |
| Working, no CVEs  | Same major      | Stay                             |
| Working, no CVEs  | New major       | Evaluate changelog, plan upgrade |
| Working, has CVEs | Patch available | Update immediately               |
| Working, has CVEs | No patch        | Find alternative or fork         |
| Deprecated        | —               | Migrate immediately              |
| Unmaintained      | —               | Fork or find alternative         |

## Output Format

```markdown
## Dependency Review: [Project]

### Issues Found

- [CVE-ID] Package: version → fixed in: version | Severity: Critical
  Impact: description
  Fix: npm update package

### Outdated Packages

- Package: current → latest | Semver: major|minor|patch
  Changelog: link
  Breaking changes: description

### Maintenance Concerns

- Package: last updated date | status: active/slow/archived
  Tickets: open issue count
  Recommendation: stay/replace

### Summary

- Total deps: N | Direct: N | Transitive: N
- Vulnerabilities: Critical N, High N, Moderate N
- Outdated: N packages behind latest
- Overall: ✅ Good | ⚠️ Warning | ❌ Action Required
```
