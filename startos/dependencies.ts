import { T } from '@start9labs/start-sdk'
import { configJson } from './fileModels/config.json'
import {
  bitcoindDescription,
  electrsDescription,
  fulcrumDescription,
} from './manifest/i18n'
import { sdk } from './sdk'

const activeBackend = async (effects: T.Effects) => {
  const config = await configJson
    .read((c) => c)
    .const(effects)
    .catch(() => null)

  if (config?.active_node_alias === 'bitcoin_core') return 'bitcoind'
  if (config?.active_node_alias === 'spectrum_node')
    return config.spectrum_backend === 'fulcrum' ? 'fulcrum' : 'electrs'
  return null
}

const bitcoind = sdk.Dependency.optional('bitcoind', {
  description: bitcoindDescription,
  metadata: {
    title: 'Bitcoin',
    icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/master/icon.svg',
  },
  versionRange:
    '(>=28.4:29 && <29) || (>=29.4:16 && <30) || (>=30.3:16 && <31) || >=31.1:16 || >=#knotsprerdts:29.3:29',
  kind: 'running',
  healthChecks: ['bitcoind', 'sync-progress'],
  enabled: async ({ effects }) => (await activeBackend(effects)) === 'bitcoind',
})

const electrs = sdk.Dependency.optional('electrs', {
  description: electrsDescription,
  metadata: {
    title: 'electrs',
    icon: 'https://raw.githubusercontent.com/Start9-Community/electrs-startos/master/icon.svg',
  },
  versionRange: '>=0.11.1:11',
  kind: 'running',
  healthChecks: ['electrs', 'sync'],
  enabled: async ({ effects }) => (await activeBackend(effects)) === 'electrs',
})

const fulcrum = sdk.Dependency.optional('fulcrum', {
  description: fulcrumDescription,
  metadata: {
    title: 'Fulcrum',
    icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/master/icon.png',
  },
  versionRange: '>=2.1.1:8',
  kind: 'running',
  healthChecks: ['primary', 'sync-progress'],
  enabled: async ({ effects }) => (await activeBackend(effects)) === 'fulcrum',
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(bitcoind)
  .addDependency(electrs)
  .addDependency(fulcrum)
