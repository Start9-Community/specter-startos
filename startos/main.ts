import { bitcoinCoreJson } from './fileModels/bitcoin_core.json'
import { configJson } from './fileModels/config.json'
import { spectrumNodeJson } from './fileModels/spectrum_node.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { bitcoindRpcAddr, electrumAddr, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info('Starting Specter!')

  // Point specter's node config at the active backend's live LXC-bridge
  // address before the daemon reads it (replaces the deprecated `.startos`
  // DNS). Reactive: main re-fires and restarts specter if the backend
  // selection or the dependency's bridge address changes.
  const config = await configJson
    .read((c) => c)
    .const(effects)
    .catch(() => null)

  if (config?.active_node_alias === 'bitcoin_core') {
    const rpc = await bitcoindRpcAddr(effects)
    if (rpc)
      await bitcoinCoreJson.merge(effects, {
        host: rpc.hostname,
        port: String(rpc.port),
      })
  } else if (config?.active_node_alias === 'spectrum_node') {
    const addr = await electrumAddr(
      effects,
      config.spectrum_backend === 'fulcrum' ? 'fulcrum' : 'electrs',
    )
    if (addr)
      await spectrumNodeJson.merge(effects, {
        host: addr.hostname,
        port: addr.port,
      })
  }

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'specter' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/data',
      readonly: false,
    }),
    'specter-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('chown', {
      subcontainer,
      exec: {
        command: ['chown', '-R', 'specter:specter', '/data'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: {
        command: [
          'python3',
          '-m',
          'cryptoadvance.specter',
          'server',
          '--host',
          '0.0.0.0',
          '--port',
          '25441',
          '--specter-data-folder',
          '/data/.specter',
        ],
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['chown'],
    })
})
