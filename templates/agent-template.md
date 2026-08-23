---
description: >
  Brief description of this agent's role, responsibilities, and when to use it.
  Used for auto-routing from the orchestrator.
mode: subagent
temperature: 0.1
tools:
  read: true
  write: false
  edit: false
  bash: false
  grep: true
  glob: true
permission:
  bash: deny
  edit: deny
  write: deny
---

# Agent Name

You are a [role]. [Purpose statement — what you do.]

## Core Responsibilities

1. Responsibility 1
2. Responsibility 2

## Process

1. Step 1
2. Step 2

## Standards

- Standard 1
- Standard 2

## Output Format

Describe what this agent produces.

## Escalation

- If X happens → route to [other agent]
- If Y happens → route to [other agent]
