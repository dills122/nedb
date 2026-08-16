# AGENTS

AI coding guidance for this repository.

## Purpose

This repository builds `@dills1220/nedb`, a maintained fork of the NeDB embedded JavaScript datastore.

Optimize for:

- backward compatibility with the documented NeDB API and on-disk format
- persistence correctness and protection against data loss
- small, explicit changes over broad refactors
- tests and documentation when behavior, contracts, setup, or commands change

## Architecture Boundaries

Primary areas:

- `lib/`: the Node.js datastore, query, indexing, execution, and persistence implementation
- `browser-version/`: browser-specific storage adapters and generated browser distribution sources
- `test/` and `integration/`: unit coverage and end-to-end package usage tests

When a change spans areas, preserve ownership boundaries and update shared contracts first.

## Contract-First Files

Treat these as interface contracts before implementation details:

- `index.js` and the public APIs documented in `README.md`
- `package.json`, including package entry points, runtime dependencies, and npm scripts
- the append-only persistence format implemented by `lib/persistence.js`

If behavior changes, update the relevant contract and docs in the same change.

## Scope Control

- Keep changes localized to the requested behavior.
- Avoid unrelated refactors and generated artifact churn.
- Call out follow-up work separately from the current change.
- Do not change public interfaces, storage formats, or package names without explicit intent.

## Repository Conventions

- Preserve the existing CommonJS module boundary and callback-compatible public API.
- Prefer existing helper APIs and local patterns.
- Add focused tests for behavior changes.
- Update docs when setup steps, commands, contracts, or workflows change.

## Useful Commands

- Install dependencies: `npm ci`
- Unit tests: `npm test`
- Integration tests: `npm run test:integration`
- Full test suite: `npm run test:all`
- Coverage gate: `npm run coverage:check`

No standalone lint, typecheck, or build command is currently configured.

## Branch And PR Metadata

- Use feature branches for behavior, contract, test, or documentation changes.
- Do not commit directly to `master`.
- When work is ready, provide:
  - branch name
  - PR title
  - PR summary
  - test evidence
