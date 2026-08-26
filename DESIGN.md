# dsh-generative-ideas — design (v1)

**What:** a sidebar entry (rich-context family) opening an ideation overlay: generate and simulate roadmaps, compare, pick one, export it as `goal.md`, and dispatch it to an agent in the chosen workspace.

## Flow (the operator's loop)

1. **Context in**: workspace (dropdown, from the sessions store slugs), current goal or free-text focus, constraints, horizon
2. **Generate**: the host spawns an in-process agent (`ctx.agents.create` + followup, verified seam) with a roadmap-generation brief → returns 3-5 distinct roadmap options (JSON: name, thesis, phases[], risks[], bets, estimated effort)
3. **Simulate/compare**: each option renders as a bleed-row card — phases with percents, risk chips, effort; the agent's simulation notes attached; side-by-side selectable
4. **Choose**: pick the one that fits (select + confirm)
5. **Export**: write `goal.md` to the chosen workspace root (structured markdown: thesis, phases with acceptance items, risks, non-goals)
6. **Dispatch** (optional): wake an agent in that workspace with the goal (followup carrying the goal summary + path) — the goal becomes the mission

## Host

- `POST /api/rich-ideas/generate` `{ workspace, focus, constraints?, horizon? }` → runs the in-process generation agent, resolves with options
- `POST /api/rich-ideas/export` `{ workspace, option }` → writes `<root>/goal.md`
- `POST /api/rich-ideas/dispatch` `{ workspace, path }` → followup to a live/new agent in that workspace
- State route: workspaces list + last generation (session-scoped cache)

## UI

Overlay panel, same island pattern: context form (top) → generating state (agent status) → options list (bleed rows, expandable phases) → chosen banner → export/dispatch actions. Segmented tabs? No — single guided flow with a stepper strip.

Zero runtime deps.
