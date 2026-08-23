---
name: refactoring
description: >
  Systematic refactoring patterns: code smells identification, safe
  restructuring, behavior preservation, and complexity reduction.
  Uses ast-lens for structural analysis before and after.
---

# Refactoring Standards

## Core Principle

**Refactor to improve structure without changing behavior.**

## Refactoring Process

1. **Measure** — capture current state (complexity, test coverage, dead code)
2. **Identify** — code smells and targets (ast-lens: analyze_complexity, find_unused_exports)
3. **Plan** — ordered steps with tests verifying each transformation
4. **Execute** — one small change at a time
5. **Verify** — tests still pass after each change
6. **Repeat** — iterate on next target

## Code Smells (via ast-lens)

| Smell           | Detection                          | Fix                          |
| --------------- | ---------------------------------- | ---------------------------- |
| Long function   | analyze_complexity > 10            | Extract functions            |
| Deep nesting    | search: nested conditionals        | Early return, guard clauses  |
| Duplicate code  | grep for similar patterns          | Extract shared function      |
| Large module    | summarize_module with many exports | Split by concern             |
| Dead code       | find_unused_exports                | Remove                       |
| Circular deps   | detect_circular_deps               | Extract shared module        |
| Too many params | list_symbols → count params        | Use config object            |
| Global state    | grep for module-level mutable vars | Encapsulate, pass explicitly |

## Safe Refactoring Techniques

| Technique           | Description                             | Tool                         |
| ------------------- | --------------------------------------- | ---------------------------- |
| Extract function    | Move code block to named function       | Editor refactor              |
| Extract constant    | Replace magic value with named constant | Search/replace               |
| Inline function     | Replace function call with body         | Editor refactor              |
| Rename symbol       | Update all references                   | find_references + replace    |
| Move to module      | Relocate to more appropriate module     | Move + update imports        |
| Introduce parameter | Replace hardcoded value with param      | Manual refactor              |
| Split module        | Divide large module into smaller ones   | Create files, barrel exports |

## TypeScript-Specific Refactoring

- `any` → specific type (search_ast: any_usage)
- `!` assertion → proper narrowing
- `@ts-ignore` → proper fix (search_ast: ts_ignore)
- `as` casting → discriminated union or Zod parse
- Missing return types → add explicit types
- Namespace → ES module

## Verification After Refactoring

- `tsc --noEmit` passes (type integrity)
- All tests pass (behavior preserved)
- No new unused exports (ast-lens find_unused_exports)
- Complexity reduced (ast-lens analyze_complexity)
- No new circular dependencies (ast-lens detect_circular_deps)
- Coverage maintained or improved
