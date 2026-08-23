---
name: communication
description: >
  Communication patterns for multi-agent systems: message formats, escalation
  protocols, context handoff, and result aggregation. Ensures clear
  information flow between agents.
---

# Multi-Agent Communication

## Message Types

| Type       | Format               | When Used                     |
| ---------- | -------------------- | ----------------------------- |
| Task       | Structured directive | Assigning work to sub-agent   |
| Status     | Progress update      | Reporting completion/blockers |
| Result     | Deliverable output   | Returning completed work      |
| Error      | Error details        | Reporting failures            |
| Request    | Information request  | Sub-agent needs more context  |
| Escalation | Escalation notice    | Task exceeds agent capability |

## Task Message Format

```json
{
  "type": "task",
  "id": "uuid",
  "agent": "builder|tester|debugger|...",
  "priority": "critical|high|medium|low",
  "directive": {
    "action": "implement|fix|review|test|research",
    "target": "component or file",
    "requirements": "...",
    "constraints": ["..."]
  },
  "context": {
    "skills": ["skill-name"],
    "files": ["relevant-file.ts"],
    "references": ["url or file"]
  },
  "deadline": "ISO timestamp or null"
}
```

## Result Message Format

```json
{
  "type": "result",
  "id": "uuid",
  "status": "success|partial|failed",
  "summary": "Brief description of what was done",
  "deliverables": [
    { "type": "file|test|docs|data", "path": "...", "summary": "..." }
  ],
  "quality": {
    "testsPassing": true,
    "lintClean": true,
    "coverage": 92
  },
  "issues": ["any remaining concerns"]
}
```

## Escalation Protocol

| Condition                           | Escalate To  | Action                     |
| ----------------------------------- | ------------ | -------------------------- |
| Complexity exceeds agent capability | `architect`  | Re-design approach         |
| Error cannot be resolved            | `debugger`   | Root cause analysis        |
| Security concern detected           | `security`   | Full audit                 |
| Task scope too large                | `planner`    | Re-plan with decomposition |
| Missing information                 | orchestrator | Provide missing context    |

## Context Handoff

When passing context between agents, include:

1. **Current state**: what's been done so far
2. **Relevant files**: paths to code being worked on
3. **Decisions made**: key choices and rationale
4. **Open questions**: what still needs resolution
5. **Constraints**: deadlines, dependencies, limitations

## Result Aggregation

When multiple agents complete work in parallel:

1. Collect all results
2. Verify no conflicts (overlapping file changes)
3. Run integration tests across combined changes
4. Resolve merge conflicts in orchestration layer
5. Produce unified summary
