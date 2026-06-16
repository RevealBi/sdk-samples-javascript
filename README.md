# Reveal SDK JavaScript Samples

This repository contains end-to-end Reveal SDK samples across multiple client and server stacks.

## Goals

- Provide runnable examples for common SDK scenarios.
- Serve as the source for documentation-embedded code samples.
- Provide a repeatable validation process before docs updates and releases.

## Quick Start

From the repository root, start a static file server:

```bash
python -m http.server 8080
```

Then open sample pages at:

```text
http://localhost:8080/<sample-folder>/index.html
```

## Official Local Validation Workflow

Use this workflow for sample changes that are embedded in docs pages (especially `srcdoc` iframe content).

### Stage A: Direct Sample Validation

1. Start local static server from repo root.
2. Open affected sample pages directly.
3. Verify each sample renders successfully.
4. Verify browser network requests do not use `localhost:5111` (unless intentionally testing a local backend).

### Stage B: Official `srcdoc` Harness Validation

The official local method for docs-embed simulation is:

- `tools/srcdoc-harness.html`

This repository uses the root `README.md` as the single source of truth for the harness workflow.

Open in browser:

```text
http://localhost:8080/tools/srcdoc-harness.html
```

Use the harness controls:

1. Select the sample path (or use a preset).
2. Test with CSP mode `none` (baseline should render).
3. Test with CSP mode `block` (expected to fail, validates CSP sensitivity).
4. Test with CSP mode `allow` (should render when CSP includes required hosts).

Recommended checks while running the harness:

1. Open browser DevTools Console and Network tabs.
2. In `none` mode, confirm dashboard renders without CSP errors.
3. In `block` mode, confirm CSP violations are visible (expected behavior).
4. In `allow` mode, confirm module loads from jsdelivr and backend calls go to `samples.revealbi.io`.

Expected CSP allow-list requirements for docs embedding:

- `script-src` includes `https://cdn.jsdelivr.net`
- `connect-src` includes `https://samples.revealbi.io`

### Stage C: Documentation Integration Validation

After Stage A and Stage B pass:

1. Run the Documentation repository locally.
2. Validate the docs page that embeds the sample code.
3. Confirm behavior matches Stage B (`allow` mode success).
4. Confirm no iframe CSP violations in Console/Network.

## Recommended Pass/Fail Checklist

A change is ready when all are true:

- Sample renders directly in Stage A.
- Sample renders in Stage B with CSP mode `allow`.
- Stage B with CSP mode `block` reproduces expected failures.
- No accidental `about:///` fetches.
- No accidental calls to `localhost:5111` in cloud-backed sample paths.
- Docs integration page passes Stage C.

## Notes

- Some samples intentionally use local backends for server-side walkthroughs.
- For docs-embedded cloud demos, prefer:
  - `https://samples.revealbi.io/upmedia-backend/reveal-api/`
