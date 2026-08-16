# Testing And Quality Gates

Testing should protect datastore behavior, persistence contracts, and Node/browser boundaries.

## Default Expectations

- Add or update focused tests for behavior changes.
- Cover query edge cases, index constraints, persistence failures, compaction, and asynchronous ordering.
- Keep test fixtures small, explicit, and isolated in temporary paths.
- Prefer deterministic tests over timing-sensitive assertions.

## Before Finishing Work

Run the smallest reliable command that validates the changed area, followed by the complete relevant gate:

- Unit tests: `npm test`
- Integration tests: `npm run test:integration`
- Full suite: `npm run test:all`
- Coverage: `npm run coverage:check`

No standalone lint, typecheck, or build command is currently configured. If a command cannot run locally, document why and what risk remains.

## Quality Gates

- No known failing tests introduced by the change.
- Coverage thresholds remain enforced when production code changes.
- No unrelated formatting or lockfile churn.
- Public APIs and persistence behavior remain backward compatible unless a change is explicit.
- Docs are updated for setup, command, package, or workflow changes.
