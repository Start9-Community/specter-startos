# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Backend addresses come from `sdk.host.getBridgeAddress`, resolved per start** and written into the node file before the daemon reads it. `ssl: false` on every binding — bitcoind's RPC and both Electrum servers are dialed plaintext. **Leave `host` unset when the address is null** rather than writing a placeholder; the `.const()` heals it when the dependency appears.
- **Dependency host ids and ports are imported from the dependencies' own `utils.ts`**, not hardcoded — electrs binds Electrum on its `electrum` host, Fulcrum on `main`. Keep the imports.
- **Every backend dependency requires a sync check, not just `running`.** A backend that answers while still catching up reports wrong balances, which is worse for a wallet interface than not connecting.
- **The node files' `python_class`, `fullpath`, `name` and `alias` are `z.literal` pins** — Specter identifies a node by them, so a hand-edit is repaired on read.
- **Bitcoin RPC credentials are generated here and requested from bitcoind** via `sdk.action.createTask` against its `generate-rpc-dependent` action, pre-filled and `accept`-locked. Existing credentials in the node file are reused rather than regenerated — don't rotate on every selection.
- **The `chown` oneshot is required.** The image runs as `specter` and the volume arrives root-owned.
