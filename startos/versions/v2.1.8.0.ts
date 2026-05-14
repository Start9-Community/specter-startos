import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_2_1_8_0 = VersionInfo.of({
  version: '2.1.8:0',
  releaseNotes: {
    en_US: 'Initial StartOS 0.4 rebuild for Specter 2.1.8.',
    es_ES: 'Reconstrucción inicial para StartOS 0.4 de Specter 2.1.8.',
    de_DE: 'Initialer StartOS-0.4-Rebuild für Specter 2.1.8.',
    pl_PL: 'Wstępna przebudowa Specter 2.1.8 pod StartOS 0.4.',
    fr_FR: 'Reconstruction initiale de Specter 2.1.8 pour StartOS 0.4.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
