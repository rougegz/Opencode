---
name: token-efficiency
description: >
  Token optimization strategies for free/open models. Instruction compression,
  context management, smart truncation, and budget allocation to maximize
  quality per token.
---

# Token Efficiency for Free/Open Models

## Core Principles

- Every token is precious — compress ruthlessly
- Structure for eviction: most important info first
- Templates over free text: slot-filling uses fewer tokens
- Batch independent work to share context
- Summarize aggressively between steps

## Instruction Compression

### Compression Techniques

| Technique           | Method                                               | Savings |
| ------------------- | ---------------------------------------------------- | ------- |
| Article pruning     | Remove a/an/the where clear                          | 5-10%   |
| Preposition swap    | Use `/` or `:` instead of "for the purpose of"       | 3-5%    |
| Verb-first          | "Validate input" not "You should validate the input" | 10-15%  |
| Semicolon join      | Combine related short sentences                      | 5-8%    |
| Abbreviation        | Use standard abbreviations where clear               | 3-5%    |
| Remove pleasantries | No "please", "thank you", "let's"                    | 2-3%    |

### Compression Example

**Before** (78 tokens):
"You should start by loading the best-js-coding skill, then you need to explore the codebase to understand the current structure, and after that you can begin implementing the feature."

**After** (32 tokens):
"Load skill best-js-coding. Explore codebase first. Then implement."

## Context Hierarchy

```
Priority 1: Task instructions (most critical)
Priority 2: Skill content (domain expertise)
Priority 3: Current code context (relevant files)
Priority 4: Conversation history (recent messages)
Priority 5: Tool results (truncated to essential)
Priority 6: Lesssons.md (historical patterns)

Eviction order: 6 → 5 → 4 → 3 (when context full)
```

## Smart Truncation

- Tool results: keep first/last 20%, drop middle
- Error traces: keep message + first 5 stack frames
- File content: keep imports/exports + relevant functions
- Search results: keep first 3 relevant results
- Conversation: summarise older messages in 1 sentence

## Template-Based Prompting

```templates
# Code generation template (~45 tokens)
Generate: {component}
Type: {function|class|module}
Input: {params}
Output: {return type}
Constraints: {constraints}
Edge cases: {edgeCases}

# Review template (~30 tokens)
Review: {file}
Focus: {security|performance|correctness}
Report: {critical|warning|suggestion}

# Debug template (~40 tokens)
Bug: {symptom}
Failed at: {location}
Expected: {expected}
Actual: {actual}
Code: {minimalReproduction}
Root cause: ?
Fix: ?
```

## Token Budget Allocation

| Model Limit | Instructions | Skills | Context | Tool Results |
| ----------- | ------------ | ------ | ------- | ------------ |
| 8K          | 800          | 1,500  | 3,000   | 2,700        |
| 16K         | 1,500        | 3,000  | 6,000   | 5,500        |
| 32K         | 3,000        | 6,000  | 12,000  | 11,000       |
| 64K         | 6,000        | 12,000 | 24,000  | 22,000       |
| 128K        | 12,000       | 25,000 | 48,000  | 43,000       |

## Skill Loading Strategy

- Load by trigger, not by task type — skills add ~200-500 tokens
- Compress skill content: keep rules, prune examples
- Skill-as-compressed-expertise: 160-350 tokens per skill
- Unload skills after use (if context pressure)
- Prefer targeted skill over broad skill

## Batch Processing

- Dispatch multiple independent sub-agents in parallel
- Each sub-agent has its own context budget
- Orchestrator holds only: decomposed tasks + integration results
- Parallel reduces total tokens by sharing orchestrator context
