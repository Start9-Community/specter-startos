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

export const uiPort = 25441

// bitcoind's RPC binding, taken from the dependency's own exports so the
// bridge lookup tracks its source of truth (host id + internal port).
export const btcRpcBinding = {
  packageId: 'bitcoind',
  hostId: btcRpcHostId,
  internalPort: btcRpcPort,
  ssl: false,
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
    ssl: false,
  },
  fulcrum: {
    packageId: 'fulcrum',
    hostId: fulcrumHostId,
    internalPort: fulcrumPort,
    ssl: false,
  },
} as const
