# Repository Scope And Priorities

This repository builds `@dills1220/nedb`, a maintained NeDB-compatible embedded datastore.

Primary deliverables:

- an in-memory and file-backed datastore for Node.js
- browser-compatible persistence through the browser-specific adapters
- the documented MongoDB-like query, update, indexing, and cursor API

Core priorities:

- backward-compatible public behavior
- persistence and compaction correctness without data loss
- deterministic query and index behavior
- maintainable local and CI workflows

## Active Boundaries

- `lib/datastore.js`, `lib/cursor.js`, and `lib/model.js` own public datastore and query behavior.
- `lib/persistence.js`, `lib/storage.js`, and `lib/executor.js` own durable storage and serialized execution.
- `browser-version/` owns browser-specific substitutions and distribution sources.
- `test/` and `integration/` own regression and package-level verification.

## Safe Refactor Boundaries

Do not refactor these without explicit instruction:

- the public CommonJS package entry point and callback API
- the append-only on-disk data format and compaction semantics
- query, projection, update, and index compatibility behavior
- browser mapping paths registered in `package.json`

Safe default changes:

- dependency and CI maintenance with compatibility verification
- focused correctness fixes with regression tests
- test coverage and deterministic fixture improvements
- documentation corrections that match verified behavior
