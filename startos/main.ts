import { bitcoinCoreJson } from './fileModels/bitcoin_core.json'
import { configJson } from './fileModels/config.json'
import { spectrumNodeJson } from './fileModels/spectrum_node.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { btcRpcBinding, electrumBinding, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info('Starting Specter!')

  // Point specter's node config at the active backend's live LXC-bridge
  // address before the daemon reads it. The getBridgeAddress `.const()` restarts
  // specter only when that address actually changes (dependency
  // install/uninstall/port-change), never on a dependency update; while the
  // dependency is absent the address is null and we leave the node file's host
  // unset, so specter simply fails to connect until the `.const()` heals it.
  const config = await configJson
    .read((c) => c)
    .const(effects)
    .catch(() => null)

  if (config?.active_node_alias === 'bitcoin_core') {
    const addr = await sdk.host.getBridgeAddress(effects, btcRpcBinding).const()
    if (addr) {
      const [host, port] = addr.split(':')
      await bitcoinCoreJson.merge(effects, { host, port })
    }
  } else if (config?.active_node_alias === 'spectrum_node') {
    const binding =
      electrumBinding[
        config.spectrum_backend === 'fulcrum' ? 'fulcrum' : 'electrs'
      ]
    const addr = await sdk.host.getBridgeAddress(effects, binding).const()
    if (addr) {
      const [host, port] = addr.split(':')
      await spectrumNodeJson.merge(effects, { host, port: Number(port) })
    }
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
