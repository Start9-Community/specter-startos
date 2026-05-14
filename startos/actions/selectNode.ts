import { utils } from '@start9labs/start-sdk'
import { generateRpcUserDependent } from 'bitcoin-core-startos/startos/actions/generateRpcUserDependent'
import { bitcoinCoreJson } from '../fileModels/bitcoin_core.json'
import { configJson } from '../fileModels/config.json'
import { spectrumNodeJson } from '../fileModels/spectrum_node.json'
import { sdk } from '../sdk'

const { InputSpec, Value, Variants } = sdk

type SpectrumBackend = 'electrs' | 'fulcrum'

const BITCOIN_NODE_DEFAULTS = {
  python_class: 'cryptoadvance.specter.node.Node',
  fullpath: '/data/.specter/nodes/bitcoin_core.json',
  name: 'Bitcoin Core',
  alias: 'bitcoin_core',
  autodetect: false,
  datadir: '',
  port: '8332',
  host: 'bitcoind.startos',
  protocol: 'http',
  node_type: 'BTC',
} as const

function spectrumDefaults(backend: SpectrumBackend) {
  return {
    python_class:
      'cryptoadvance.specterext.spectrum.spectrum_node.SpectrumNode',
    fullpath: '/data/.specter/nodes/spectrum_node.json',
    name: 'Spectrum Node',
    alias: 'spectrum_node',
    host: backend === 'fulcrum' ? 'fulcrum.startos' : 'electrs.startos',
    port: 50001,
    ssl: false,
  } as const
}

export const inputSpec = InputSpec.of({
  node: Value.union({
    name: 'Node',
    description:
      'Choose how Specter reaches the Bitcoin network. Spectrum Node uses an Electrum indexer for fast wallet imports and rescans; Bitcoin Core / Knots talks RPC directly with no indexer.',
    default: 'spectrum_node',
    variants: Variants.of({
      spectrum_node: {
        name: 'Spectrum Node (recommended)',
        spec: InputSpec.of({
          backend: Value.select({
            name: 'Spectrum Backend',
            description:
              'Electrum server that Spectrum Node queries. Fulcrum is faster on chunky wallet histories; electrs is lighter and quicker to sync from scratch.',
            default: 'fulcrum',
            values: {
              fulcrum: 'Fulcrum (recommended)',
              electrs: 'electrs',
            },
          }),
        }),
      },
      bitcoin_core: {
        name: 'Bitcoin Core / Knots',
        spec: InputSpec.of({}),
      },
    }),
  }),
})

export const selectNode = sdk.Action.withInput(
  'select-node',

  {
    name: 'Select Node',
    description: 'Choose the Bitcoin backend for Specter',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },

  inputSpec,

  async ({ effects }) => {
    const existing = await configJson
      .read((c) => c)
      .const(effects)
      .catch(() => null)

    if (existing?.active_node_alias === 'bitcoin_core') {
      return { node: { selection: 'bitcoin_core' as const, value: {} } }
    }

    return {
      node: {
        selection: 'spectrum_node' as const,
        value: { backend: existing?.spectrum_backend ?? 'fulcrum' },
      },
    }
  },

  async ({ effects, input }) => {
    if (input.node.selection === 'spectrum_node') {
      const backend = input.node.value.backend as SpectrumBackend

      await configJson.write(effects, {
        active_node_alias: 'spectrum_node',
        spectrum_backend: backend,
        bitcoind: false,
      })
      await spectrumNodeJson.write(effects, spectrumDefaults(backend))

      return {
        version: '1',
        title: 'Success',
        message: `Spectrum Node selected and configured with ${backend}.`,
        result: null,
      }
    }

    await configJson.write(effects, {
      active_node_alias: 'bitcoin_core',
      spectrum_backend: null,
      bitcoind: true,
    })

    const existingBitcoinNode = await bitcoinCoreJson
      .read((n) => n)
      .const(effects)
      .catch(() => null)

    if (existingBitcoinNode?.user && existingBitcoinNode?.password) {
      await bitcoinCoreJson.write(effects, {
        ...BITCOIN_NODE_DEFAULTS,
        user: existingBitcoinNode.user,
        password: existingBitcoinNode.password,
      })
      return {
        version: '1',
        title: 'Success',
        message:
          'Bitcoin Core / Knots is already configured. Existing RPC credentials were reused.',
        result: null,
      }
    }

    const username = `specter_${utils.getDefaultString({
      charset: 'a-z,A-Z',
      len: 8,
    })}`
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,1-9,_,-',
      len: 22,
    })

    await sdk.action.createTask(
      effects,
      'bitcoind',
      generateRpcUserDependent,
      'critical',
      {
        input: {
          kind: 'partial',
          value: { username, password },
        },
        reason: 'Specter needs dependency-scoped Bitcoin RPC credentials.',
      },
    )

    await bitcoinCoreJson.write(effects, {
      ...BITCOIN_NODE_DEFAULTS,
      user: username,
      password,
    })

    return {
      version: '1',
      title: 'Success',
      message:
        'Bitcoin Core / Knots selected and new RPC credentials were generated for Specter.',
      result: null,
    }
  },
)
