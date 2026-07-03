import { T } from '@start9labs/start-sdk'
import { configJson } from './fileModels/config.json'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const config = await configJson
    .read((c) => c)
    .const(effects)
    .catch(() => null)

  const deps: T.CurrentDependenciesResult<any> = {}

  if (!config?.active_node_alias) return deps

  if (config.active_node_alias === 'spectrum_node') {
    if (config.spectrum_backend === 'fulcrum') {
      deps.fulcrum = {
        kind: 'running',
        versionRange: '>=2.1.1:6',
        healthChecks: ['primary', 'sync-progress'],
      }
    } else {
      deps.electrs = {
        kind: 'running',
        versionRange: '>=0.11.1:9',
        healthChecks: ['electrs', 'sync'],
      }
    }
    return deps
  }

  deps.bitcoind = {
    kind: 'running',
    versionRange: '>=28.4:13',
    healthChecks: ['bitcoind', 'sync-progress'],
  }
  return deps
})
