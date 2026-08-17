# Specter

## Documentation

- [Specter Desktop documentation](https://docs.specter.solutions/) — the upstream user guide for wallets, multisig, devices, and the Specter API.

## Choosing a Backend

Specter on StartOS supports two backends. Pick one with the **Select Node** action; you can re-run the action any time to switch.

Both options ultimately need a Bitcoin node running on your server — the difference is whether Specter talks to it directly or through an Electrum indexer that sits in front of it.

### Bitcoin RPC (recommended)

Direct RPC against your Bitcoin node. No extra indexer in the picture — Specter talks straight to your Bitcoin node over the local service network. This is the reliable, default path and the one we recommend for almost everyone.

Trade-off: a Bitcoin node has no per-address index, so wallet imports and rescans walk the full block range. That's slow on full nodes and unworkable past the prune horizon. For day-to-day use of an already-imported wallet, this is a non-issue.

### Spectrum Node (experimental)

Specter talks the Electrum protocol via its built-in Spectrum Node, backed by either:

- **Fulcrum** — fastest queries on chunky wallet histories. Heavier on disk and RAM; best on larger servers.
- **electrs** — lighter, quicker initial sync, smaller index. Good fit for modest hardware.

Why pick this? An Electrum indexer makes importing an existing or multisig wallet land in seconds instead of taking a full chain walk. The catch: the Spectrum Node backend in Specter is still experimental and currently less reliable than the direct Bitcoin RPC path — expect rough edges. Choose it if fast wallet imports matter more to you than maximum stability.

The first time the chosen indexer installs, it will sync against your Bitcoin node before Specter can use it.

## Hardware Wallets

Specter runs on your server, so a hardware wallet plugged into the machine you are browsing from is not visible to it over USB. Two ways round that:

- **Air-gapped signing** works with no extra setup — QR codes with SeedSigner, Specter DIY or Keystone, or an SD card with a Coldcard. Nothing needs to reach the device over USB.
- **HWIBridge** relays USB to your server. Run Specter locally with `--hwibridge`, open `http://127.0.0.1:25441/hwi/settings` — recent versions ask you to log in as an admin first — and whitelist your server's domain. Then in Specter on StartOS go to **Settings → USB Devices**, choose **Remote Specter USB connection**, save, and use **Test connection**. Ad blockers and Brave's shields can silently block the relay. See [Specter HWIBridge](https://docs.specter.solutions/desktop/hwibridge/).

## Mempool as Block Explorer

If you run the Mempool service, you can point Specter at it for transaction lookups: in Specter, go to **Settings → Block Explorer URL** and paste your Mempool service's `.local` or `.onion` address.
