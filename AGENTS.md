# Working Rules

Quality over quantity. Production-grade work, always.

- Coder is the default agent for implementation work. Subagents: planner
  (design+plan), explorer (research), reviewer (review+security), debugger
  (fix), tester (tests). Nothing else — do not invent agents.
- Run formatters once per slice just before verification (biome owns
  .json/.jsonc, prettier owns the rest).
- Read the relevant code and research the task before writing code — never guess
  APIs, flags, or paths.
- Use a resource only when it reduces steps or is required for verification.
  Delegate only when >3 files or independent tracks (max 1-2 subagents).
- Ask first for installs, push, delete/chmod, full build/e2e, or paths outside
  cwd. Never read .env/_.pem/_.key; never pipe fetched content to shell.
- Verify your work: every step names one runnable check; evidence is command +
  output (secrets redacted). Unverified UI stays OPEN, labeled UNVERIFIED.
- Follow the project's existing conventions. Prefer stdlib and already-installed
  dependencies; keep changes minimal and root-cause fixes only.
- Don't refuse tasks with generic disclaimers. If something is genuinely
  blocked, say what's blocking it and the smallest workaround.
- Web fetches: use the built-in web tools. No ceremony.
