---
name: debugging-mastery
description: >
  Systematic debugging techniques: Iron Law process, root-cause analysis,
  regression prevention, and production incident response. Patterns for
  isolating and fixing every type of bug.
---

# Debugging Mastery

## The Iron Law of Debugging (4 Phases)

### Phase 1: REPRODUCE

Goal: Get a minimal, reliable reproduction of the bug.

- Find the exact inputs, state, sequence that triggers it
- Eliminate variables until smallest failing test case
- Document exact failure mode (error message, stack trace, wrong output)
- Create a test that captures the failure

### Phase 2: ISOLATE

Goal: Find the root cause (not the symptom).

- Binary search: comment out half the code path, test, repeat
- Check all assumptions: input validation, state initialization, type
  correctness
- Add targeted logging at suspicion points
- Use ast-lens tools: call_graph for execution path, search_ast for patterns
- Look for common bug patterns (see below)

### Phase 3: FIX

Goal: Minimal, precise fix addressing root cause.

- One bug, one fix — don't scope-creep
- Understand why original code was wrong
- Add comment explaining WHY the fix works
- Check for same anti-pattern elsewhere in codebase

### Phase 4: VERIFY

Goal: Prove fix works and stays working.

- Regression test that fails WITHOUT the fix
- Run full test suite
- Verify related edge cases not broken

## Common Bug Patterns

| Pattern         | Symptom              | Root Cause           | Fix                        |
| --------------- | -------------------- | -------------------- | -------------------------- |
| N+1 Query       | Slow API response    | Missing eager load   | Add include/select/join    |
| Race Condition  | Intermittent failure | Shared mutable state | Lock or immutable data     |
| Memory Leak     | Growing memory usage | Uncleaned listeners  | Remove in finally/cleanup  |
| Stale Closure   | Sees old state       | Captured variable    | useRef or recreate closure |
| Off-by-One      | Wrong count/position | Incorrect boundary   | Fix > vs >=                |
| Swallowed Error | Silent failure       | Empty catch block    | Log and handle error       |
| Async/Await gap | Promise not awaited  | Missing await        | Add await or .catch        |
| Circular Import | Undefined at runtime | Module cycle         | Extract shared module      |
| Timeout Hang    | Never resolves       | Missing timeout      | Add AbortController        |
| Type Coercion   | Wrong comparison     | == vs ===            | Use strict equality        |

## Debugging Tools

| Tool                          | Use Case                                          |
| ----------------------------- | ------------------------------------------------- |
| ast-lens call_graph           | Trace execution paths                             |
| ast-lens search_ast           | Find structural patterns (empty catch, any usage) |
| ast-lens detect_circular_deps | Find circular imports                             |
| ast-lens analyze_complexity   | Find complex functions needing refactor           |
| git bisect                    | Find which commit introduced bug                  |
| git log -p                    | See change history for file                       |
| node --inspect                | Step-through debugging                            |
| Node.js --prof                | CPU profiling                                     |
| heap snapshot                 | Memory leak analysis                              |

## Production Incident Response

1. **Assess** — Impact: users, data, revenue? Severity: S1-S4?
2. **Contain** — Rollback, feature flag, rate limit, kill switch
3. **Fix** — Minimal hotfix to restore service
4. **Monitor** — Verify in production, watch metrics
5. **Post-mortem** — Timeline, root cause, action items, prevent recurrence

## Regression Prevention

- Every bug fix includes a failing test
- Add the failing test BEFORE the fix to prove it catches the bug
- Run related test suites to verify no regressions
- Consider adding lint rule to catch pattern in future
