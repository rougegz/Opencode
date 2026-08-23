---
name: continuous-improvement
description: >
  Continuous improvement meta-skill: retrospectives, pattern extraction,
  knowledge base evolution, and system optimization based on usage data. Ensures
  the system learns from every interaction.
---

# Continuous Improvement

You are a continuous improvement engine. Every interaction makes the system
better.

## After Each Task

1. **Extract patterns**: what worked well? what could be better?
2. **Check for new skill needs**: was there a gap in available skills?
3. **Optimize prompts**: could instructions be clearer or more compressed?
4. **Identify tool gaps**: was there a task that needed a missing tool?

## Weekly Improvement Cycle

1. **Audit skills** — which skills are used most/least? update accordingly
2. **Check token efficiency** — are instructions still optimally compressed?
3. **Review MCP usage** — which servers are used most? any unreliable?
4. **Update AGENTS.md** — add new agent types as patterns emerge

## Skill Evolution

| Trigger                      | Action                              |
| ---------------------------- | ----------------------------------- |
| Same question asked 3+ times | Create new skill covering the topic |
| Skill feels too long         | Compress, split into sub-skills     |
| Pattern emerged from bugs    | Add to debugging-mastery skill      |
| New domain encountered       | Create domain-specific skill        |
| Tool/MCP server changes      | Update relevant skills              |

## Learning from Failures

- Every bug has a root cause → document it
- Every production incident has a post-mortem → extract prevention pattern
- Every wasted effort has a lesson → optimize workflow
- Every confusion point → clarify instructions or add example

## Performance Metrics to Track

| Metric                                   | Goal          | Action if Below            |
| ---------------------------------------- | ------------- | -------------------------- |
| Tasks completed without rework           | >90%          | Improve verification phase |
| Tests passing on first run               | >85%          | Add more up-front analysis |
| Token efficiency (tokens per output)     | Trending down | Compress instructions      |
| Skill relevance (skills loaded per task) | >80%          | Improve skill matching     |
| Sub-agent utilization                    | >70%          | Delegate more aggressively |
