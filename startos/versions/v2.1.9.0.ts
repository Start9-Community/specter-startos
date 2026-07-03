import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_2_1_9_0 = VersionInfo.of({
  version: '2.1.9:1',
  releaseNotes: {
    en_US: 'Internal updates (start-sdk 2.0.x)',
    es_ES: 'Actualizaciones internas (start-sdk 2.0.x)',
    de_DE: 'Interne Aktualisierungen (start-sdk 2.0.x)',
    pl_PL: 'Aktualizacje wewnętrzne (start-sdk 2.0.x)',
    fr_FR: 'Mises à jour internes (start-sdk 2.0.x)',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
