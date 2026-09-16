# Opencode setup

Production opencode config. 6 agents, 12 skills, hardened plugins, no bloat.

| Path            | What                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------ |
| `opencode.json` | Model, `permission: ask`, formatter (prettier + biome), MCP (ast-lens, playwright, github) |
| `AGENTS.md`     | Working rules (source of truth for behavior)                                               |
| `agent/`        | coder (primary), planner, explorer, reviewer, debugger, tester                             |
| `skills/`       | 12 on-demand skills (error-handling, testing-patterns, code-review, …)                     |
| `plugins/`      | env-protection (secret guard), notification (disabled)                                     |
| `commands/`     | fix → debugger, review → reviewer, test → tester                                           |
| `scheduler/`    | scheduler supervisor                                                                       |
| `templates/`    | agent + skill templates                                                                    |

## Fresh-machine setup (2 min)

```bash
git clone https://github.com/rougegz/Opencode.git ~/.config/opencode
cd ~/.config/opencode && npm install
opencode
```

Verify: `/review` on any file, `/` shows fix/review/test commands.
