export const DEFAULT_LANG = 'en_US'

const dict = {
  // interfaces.ts
  'Web UI': 1,
  'The web interface of Specter': 2,

  // main.ts
  'Web Interface': 10,
  'The web interface is ready': 11,
  'The web interface is not ready': 12,

  // actions/selectNode.ts — input spec
  Node: 20,
  'Choose how Specter reaches the Bitcoin network. Bitcoin RPC talks to your Bitcoin Core or Knots node directly with no indexer and is the reliable, recommended path. Spectrum Node uses an Electrum indexer for faster wallet imports and rescans, but is experimental and currently less reliable than the direct RPC backend.': 21,
  'Bitcoin RPC (recommended)': 22,
  'Spectrum Node (experimental)': 23,
  'Spectrum Backend': 24,
  'Electrum server that Spectrum Node queries. Fulcrum is faster on chunky wallet histories; electrs is lighter and quicker to sync from scratch.': 25,
  Fulcrum: 26,
  electrs: 27,

  // actions/selectNode.ts — metadata and results
  'Select Node': 28,
  'Choose the Bitcoin backend for Specter': 29,
  Success: 30,
  'Spectrum Node selected and configured with Fulcrum.': 31,
  'Spectrum Node selected and configured with electrs.': 32,
  'Bitcoin RPC is already configured. Existing RPC credentials were reused.': 33,
  'Specter needs dependency-scoped Bitcoin RPC credentials.': 34,
  'Bitcoin RPC selected and new RPC credentials were generated for Specter.': 35,

  // init/promptSelectNode.ts
  'Please choose which backend Specter should use.': 40,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
