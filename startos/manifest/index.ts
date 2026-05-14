import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'specter',
  title: 'Specter',
  license: 'mit',
  packageRepo: 'https://github.com/Start9-Community/specter-startos',
  upstreamRepo: 'https://github.com/cryptoadvance/specter-desktop',
  marketingUrl: 'https://specter.solutions',
  donationUrl: null,
  icon: 'icon.png',
  description: {
    short:
      'A Bitcoin wallet UI focused on multisig and hardware wallet workflows.',
    long: 'Specter Desktop is a Bitcoin wallet interface focused on sovereignty, multisignature setups, and hardware wallet support. This package runs Specter as a StartOS service with a web UI, persistent data, and a one-step setup that wires it to a Bitcoin Core/Knots node or to a Spectrum Node backed by electrs or Fulcrum.',
  },
  volumes: ['main'],
  images: {
    specter: {
      source: {
        dockerTag: 'ghcr.io/cryptoadvance/specter-desktop:v2.1.8',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    bitcoind: {
      description:
        'Bitcoin Core or Knots backend. Used when "Bitcoin Core / Knots" is selected.',
      optional: true,
      metadata: {
        title: 'Bitcoin Core',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/master/icon.svg',
      },
    },
    electrs: {
      description:
        'Electrum server backend reached via Spectrum Node. Used when Spectrum + electrs is selected.',
      optional: true,
      metadata: {
        title: 'electrs',
        icon: 'https://raw.githubusercontent.com/Start9-Community/electrs-startos/master/icon.svg',
      },
    },
    fulcrum: {
      description:
        'High-performance Electrum server backend reached via Spectrum Node. Used when Spectrum + Fulcrum is selected.',
      optional: true,
      metadata: {
        title: 'Fulcrum',
        icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/master/icon.png',
      },
    },
  },
})
