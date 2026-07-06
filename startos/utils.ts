import { T } from '@start9labs/start-sdk'
import {
  rpcHostId as btcRpcHostId,
  rpcPort as btcRpcPort,
} from 'bitcoin-core-startos/startos/utils'
import {
  electrumHostId as electrsHostId,
  port as electrsPort,
} from 'electrs-startos/startos/utils'
import {
  electrumPort as fulcrumPort,
  mainHostId as fulcrumHostId,
} from 'fulcrum-startos/startos/utils'
import { sdk } from './sdk'

export const uiPort = 25441

// bitcoind's RPC binding, taken from the dependency's own exports so the
// bridge lookup tracks its source of truth (host id + internal port).
export const btcRpcBinding = {
  packageId: 'bitcoind',
  hostId: btcRpcHostId,
  internalPort: btcRpcPort,
} as const

// The selected Electrum backend's binding, keyed by packageId (which doubles
// as the backend name). electrs binds its Electrum server on the 'electrum'
// host, Fulcrum on 'main'; both listen plaintext on 50001, reachable over the
// bridge as the ssl=false variant that Spectrum Node dials.
export const electrumBinding = {
  electrs: {
    packageId: 'electrs',
    hostId: electrsHostId,
    internalPort: electrsPort,
  },
  fulcrum: {
    packageId: 'fulcrum',
    hostId: fulcrumHostId,
    internalPort: fulcrumPort,
  },
} as const

/**
 * Bridge address (`10.0.3.1:<assigned external port>`) of a dependency's
 * binding, as a minimal reactive value. Chain `.const()` in main: the mapped
 * string only changes when the address itself does, so main restarts exactly
 * on dependency install/uninstall/port-change and never on dependency
 * updates. Chain `.once()` in an action context. `fallbackPort` keeps the
 * value non-null while the dependency is absent — sanctioned only for tor's
 * allocator-guaranteed SOCKS 9050. Drop-in for the planned SDK
 * `sdk.host.getBridgeAddress` helper.
 */
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort: number
  },
): { const(): Promise<string>; once(): Promise<string> }
export function bridgeAddress(
  effects: T.Effects,
  opts: { packageId: string; hostId: string; internalPort: number },
): { const(): Promise<string | null>; once(): Promise<string | null> }
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort?: number
  },
) {
  const watchable = async () => {
    const osIp = await sdk.getOsIp(effects)
    return sdk.host.get(
      effects,
      { packageId: opts.packageId, hostId: opts.hostId },
      (host) => {
        const port =
          host?.bindings[opts.internalPort]?.net.assignedPort ??
          opts.fallbackPort
        if (port == null) return null
        return `${osIp}:${port}`
      },
    )
  }
  return {
    const: async () => (await watchable()).const(),
    once: async () => (await watchable()).once(),
  }
}
