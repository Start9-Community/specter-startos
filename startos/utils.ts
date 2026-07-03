import { T, utils } from '@start9labs/start-sdk'
import {
  rpcHostId as btcRpcHostId,
  rpcInterfaceId as btcRpcInterfaceId,
} from 'bitcoin-core-startos/startos/utils'
import { sdk } from './sdk'

export const uiPort = 25441

// electrs / fulcrum expose their Electrum server under these host + interface
// ids (the `sdk.MultiHost.of` arg / `createInterface` id in each package). The
// packageId doubles as the electrum backend name.
const electrumHostId = { electrs: 'electrum', fulcrum: 'main' } as const
const electrumInterfaceId = 'main'

/**
 * The IPv4 LXC-bridge `hostname`/`port` for an interface on an already-resolved
 * `FilledHost`. Pure — call it INSIDE a `sdk.host` map fn so `.const()` narrows
 * its reactivity to just this address. `.startos` / direct container IPs are
 * deprecated; containers reach each other over this bridge. `ssl` narrows to the
 * http vs https variant when an interface exposes both.
 */
const bridgeAddr = (
  host: utils.FilledHost | null,
  interfaceId: string,
  ssl?: boolean,
) => {
  const iface =
    host &&
    Object.values(host.bindings)
      .flatMap((b) => Object.values(b.interfaces))
      .find((i) => i.id === interfaceId)
  const h =
    iface &&
    iface.addressInfo
      .filter({
        kind: 'bridge',
        predicate: (hn) =>
          hn.metadata.kind === 'ipv4' && (ssl === undefined || hn.ssl === ssl),
      })
      .hostnames[0]
  return h && h.port != null ? { hostname: h.hostname, port: h.port } : undefined
}

/**
 * bitcoind's RPC `hostname`/`port` over the LXC bridge, for specter's
 * `bitcoin_core.json` (replaces the deprecated `bitcoind.startos:8332`).
 * `undefined` until the dependency's interface is reachable.
 */
export const bitcoindRpcAddr = (effects: T.Effects) =>
  sdk.host
    .get(effects, { hostId: btcRpcHostId, packageId: 'bitcoind' }, (host) =>
      bridgeAddr(host, btcRpcInterfaceId, false),
    )
    .const()

/**
 * The Electrum server's plain-TCP `hostname`/`port` over the LXC bridge, for
 * specter's `spectrum_node.json` (replaces the deprecated `electrs.startos` /
 * `fulcrum.startos`). `undefined` until the backend's interface is reachable.
 */
export const electrumAddr = (
  effects: T.Effects,
  backend: 'electrs' | 'fulcrum',
) =>
  sdk.host
    .get(
      effects,
      { hostId: electrumHostId[backend], packageId: backend },
      (host) => bridgeAddr(host, electrumInterfaceId, false),
    )
    .const()
