# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `specter`.** It reaches its Bitcoin backend over the LXC bridge, not `.startos` DNS. The **Select Node** action (`actions/selectNode.ts`) picks the backend — direct **Bitcoin RPC** (recommended) or an experimental **Spectrum Node** over electrs/Fulcrum — and writes the credentials/selection into `config.json` + the node file. `main.ts` then resolves the active backend's live bridge `host:port` (`bitcoindRpcAddr` / `electrumAddr` in `utils.ts`; bitcoind's host/interface ids are imported from `bitcoin-core-startos/startos/utils`, electrs's/Fulcrum's are their `electrum`/`main` host ids) and merges it into `bitcoin_core.json` / `spectrum_node.json` before the daemon starts — so main re-fires and restarts specter if the selection or a dependency's bridge address changes.
- **`seedMigrationData` (init) pre-marks Specter's migrations 1 & 2 as already executed** so upstream's `migration_0002` doesn't clobber `spectrum_node.json` on first daemon start. See `fileModels/migration_data.json.ts` for the full rationale — don't remove it.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach specter -n specter-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `specter-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
