<p align="center">
  <img src="icon.png" alt="Specter Logo" width="21%">
</p>

# Specter on StartOS

> **Upstream docs:** <https://docs.specter.solutions/>
>
> Everything not listed in this document should behave the same as upstream
> Specter Desktop. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable.

A Bitcoin wallet UI focused on multisig and hardware wallet workflows. See the [upstream repo](https://github.com/cryptoadvance/specter-desktop) for general Specter documentation.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | Upstream `ghcr.io/cryptoadvance/specter-desktop` |
| Architectures | x86_64, aarch64 |
| Entrypoint | `python3 -m cryptoadvance.specter server --host 0.0.0.0` |

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/data` | All Specter data (`.specter/`) |

StartOS-specific files written to the `main` volume:

| File | Purpose |
|------|---------|
| `.specter/config.json` | Tracks the selected backend (Bitcoin Core / Knots vs Spectrum Node) and the chosen Spectrum sub-backend. Managed by the Select Node action. |
| `.specter/nodes/bitcoin_core.json` | Bitcoin Core / Knots node entry — host, port, protocol, and the dependency-scoped RPC user/password generated for Specter. |
| `.specter/nodes/spectrum_node.json` | Spectrum Node entry pointing at either `electrs.startos:50001` or `fulcrum.startos:50001`. |

## Installation and First-Run Flow

1. On first install (or any time `config.json.active_node_alias` is unset) StartOS creates a **critical task** prompting the user to run **Select Node**.
2. **Select Node** defaults to **Spectrum Node** with **Fulcrum** as the Electrum backend — the recommended path for fast wallet imports and rescans. The user can switch the variant to Bitcoin Core / Knots, and within Spectrum can switch the backend to electrs.
3. When **Spectrum Node** is chosen, the Spectrum Node entry is wired to either `fulcrum.startos:50001` or `electrs.startos:50001` (TLS off). The chosen indexer in turn requires a Bitcoin Core / Knots node — that's a dependency of the indexer, not of Specter directly.
4. When **Bitcoin Core / Knots** is chosen, Specter generates a fresh dependency-scoped RPC username/password and dispatches `generate-rpc-dependent` to the `bitcoind` service so the credentials are appended to its `rpcauth`. If a `bitcoin_core.json` already contains usable credentials, they are reused instead.
5. Specter starts and serves its web UI on port 25441.

## Configuration Management

| StartOS-Managed | Details |
|-----------------|---------|
| Active backend | Bitcoin Core / Knots vs Spectrum Node — set by the Select Node action |
| Spectrum sub-backend | electrs or Fulcrum, when Spectrum Node is selected |
| `bitcoin_core.json` host/port/protocol | Hardcoded to `bitcoind.startos:8332` over HTTP |
| Bitcoin RPC credentials | Generated and registered on the bitcoind service via `generate-rpc-dependent`; reused if already present |
| `spectrum_node.json` host | `electrs.startos` or `fulcrum.startos`, port `50001`, `ssl: false` |

Everything else (wallet creation, multisig, devices, fees, block-explorer URLs, etc.) is configured through Specter's own web UI.

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web UI | 25441 | HTTP | Specter web interface |

## Actions (StartOS UI)

### Select Node

- **Name:** Select Node
- **Purpose:** Choose the Bitcoin backend Specter should connect to
- **Visibility:** Enabled (always visible)
- **Availability:** Any status
- **Inputs:**
  - **Node** — `Spectrum Node (recommended)` (default) or `Bitcoin Core / Knots`
  - **Spectrum Backend** — `Fulcrum (recommended)` (default) or `electrs`. Only shown when the Spectrum Node variant is selected.
- **Outputs:** A success message describing what was configured

## Backups and Restore

**Backed up:** the entire `main` volume — wallet metadata, the `.specter` configuration tree, and the StartOS-managed node entries described above.

**Restore behavior:** Standard restore. After restore, the configured backend must be installed and running. If `config.json.active_node_alias` is missing, the install task re-prompts the user to run Select Node.

## Health Checks

| Check | Method | Messages |
|-------|--------|----------|
| Web Interface | Port listening on 25441 | Success: "The web interface is ready" / Error: "The web interface is not ready" |

## Dependencies

| Dependency | Required | Version | Health checks | Purpose |
|------------|----------|---------|---------------|---------|
| Bitcoin Core (`bitcoind`) | Optional | `>=28.3:0` | `bitcoind`, `sync-progress` | Native RPC backend (also satisfied by Bitcoin Knots, which shares the `bitcoind` package id) |
| `electrs` | Optional | `>=0.10.0:0` | `electrs`, `sync` | Electrum server reached via Spectrum Node |
| `fulcrum` | Optional | `>=2.1.0:0` | `primary`, `sync-progress` | High-performance Electrum server reached via Spectrum Node |

The active dependency is determined at runtime from `config.json`. Exactly one of the three is required and must be running, depending on the user's Select Node choice.

## Limitations and Differences

1. **Backend choice is a one-shot selection** — switching backends requires re-running the Select Node action.
2. **Spectrum endpoint is hardcoded to `:50001` with TLS off** — matches StartOS service-network conventions; not user-configurable from inside Specter.
3. **Bitcoin RPC host is hardcoded to `bitcoind.startos:8332` over HTTP** — same reason; users do not enter RPC details manually.
4. **No HWI Bridge integration** — Specter runs server-only; hardware wallet support is via Specter's web UI flows (USB pass-through is not provided by the StartOS package).

## What Is Unchanged from Upstream

- All wallet, multisig, and PSBT workflows
- Hardware wallet integration via the Specter web UI
- Tor / proxy settings, block-explorer URL settings, language, and other Specter settings
- Wallet import/export, descriptor handling, and the Specter API

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: specter
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  ui: 25441
dependencies:
  - bitcoind (optional)
  - electrs (optional)
  - fulcrum (optional)
startos_managed_files:
  - .specter/config.json
  - .specter/nodes/bitcoin_core.json
  - .specter/nodes/spectrum_node.json
actions:
  - select-node
health_checks:
  - port_listening: 25441
backup_volumes:
  - main
```
