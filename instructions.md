# Specter

## Documentation

- [Specter Desktop documentation](https://docs.specter.solutions/) — the upstream user guide for wallets, multisig, devices, and the Specter API.

## Choosing a Backend

Specter on StartOS supports two backends. Pick one with the **Select Node** action; you can re-run the action any time to switch.

Both options ultimately need Bitcoin Core (or Knots) running on your server — the difference is whether Specter talks to it directly or through an Electrum indexer that sits in front of it.

### Spectrum Node (recommended)

Specter talks the Electrum protocol via its built-in Spectrum Node, backed by either:

- **Fulcrum (recommended)** — fastest queries on chunky wallet histories. Heavier on disk and RAM; best on larger servers.
- **electrs** — lighter, quicker initial sync, smaller index. Good fit for modest hardware.

Why prefer this over a direct Bitcoin Core connection? Bitcoin Core has no per-address index, so Specter has to walk blocks to find a wallet's history when you import an existing or multisig wallet — slow on full nodes, and unworkable past the prune horizon. Electrum indexers are built around exactly that lookup, so the same import lands in seconds.

The first time the chosen indexer installs, it will sync against your Bitcoin node before Specter can use it.

### Bitcoin Core / Knots

Direct RPC against your Bitcoin node. No extra indexer in the picture, but wallet imports and rescans walk the full block range, so they're slow on full nodes and unworkable past the prune horizon. Pick this if you don't want to run a separate indexer service.

## Hardware Wallets

For hardware wallet usage on StartOS, see <https://docs.start9.com/latest/user-manual/service-guides/specter/specter-service>.

## Mempool as Block Explorer

If you run the Mempool service, you can point Specter at it for transaction lookups: in Specter, go to **Settings → Block Explorer URL** and paste your Mempool service's `.local` or `.onion` address.
