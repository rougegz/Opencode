---
name: research-spike
description: >
  Research spike methodology: structured time-boxed investigation of technical
  questions, library evaluation, and feasibility studies. Produces
  evidence-based recommendations.
---

# Research Spike Methodology

## When to Spike

- Evaluating new technology/libraries
- Investigating approach feasibility
- Understanding complex systems
- Comparing multiple solutions
- Debugging a non-obvious issue
- Exploring unfamiliar domain concepts

## Spike Process

### 1. Define Questions

What exactly needs to be learned? Write 3-5 specific questions.

### 2. Research Phase (time-boxed)

- Search for official docs, tutorials, examples
- Check GitHub (stars, maintenance, open issues)
- Look for comparisons, benchmarks, reviews
- Scan Stack Overflow, dev.to, Medium for practical insights

### 3. Experiment Phase (if needed)

- Write minimal reproduction/prototype
- Test key assumptions
- Measure performance if relevant
- Verify compatibility with existing stack

### 4. Synthesize

- Answers to each research question
- Pros/cons of alternatives
- Recommendation with rationale
- Code examples if applicable

### 5. Document

- Findings in `spikes/YYYY-MM-DD-topic.md`
- Share with team (if applicable)

## Evaluation Matrix

| Criterion          | Option A  | Option B   | Option C   |
| ------------------ | --------- | ---------- | ---------- |
| TypeScript support | ✅ Full   | ⚠️ Partial | ❌ None    |
| Bundle size        | 5KB       | 15KB       | 50KB       |
| Performance        | 1M ops/s  | 500K ops/s | 100K ops/s |
| Maintenance        | Active    | Archived   | Slow       |
| Docs quality       | Excellent | Good       | Minimal    |
| Community          | Large     | Medium     | Small      |
| Learning curve     | Low       | Medium     | High       |
| **Score**          | **★★★**   | **★★**     | **★**      |

## Recommendation Format

### Recommendation: [Option Name]

**Rationale**: (2-3 sentences on why this choice) **Risk**: (what might go
wrong) **Mitigation**: (how to address risks) **Next steps**: (what to do with
this recommendation)

## Output Deliverable

```markdown
# Spike: [Topic]

## Questions

1. Q1: ... → A1: ...
2. Q2: ... → A2: ...

## Research Summary

(Key findings from investigation)

## Alternatives Evaluated

(Comparison matrix)

## Recommendation

(Clear recommendation with rationale)

## Code Examples

(If applicable, minimal working examples)

## References

(URLs for all sources)
```
