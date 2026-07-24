import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.10:1',
  releaseNotes: {
    en_US:
      'Updated Specter to 2.1.10. Bumps the hardware-wallet interface (HWI) to 3.1.0 and Spectrum to 0.8.0. See the upstream release notes: https://github.com/cryptoadvance/specter-desktop/releases/tag/v2.1.10. Also includes internal updates for start-sdk 2.0.',
    es_ES:
      'Se actualizó Specter a 2.1.10. Actualiza la interfaz de monederos hardware (HWI) a 3.1.0 y Spectrum a 0.8.0. Consulta las notas de la versión: https://github.com/cryptoadvance/specter-desktop/releases/tag/v2.1.10. También incluye actualizaciones internas para start-sdk 2.0.',
    de_DE:
      'Specter auf 2.1.10 aktualisiert. Aktualisiert die Hardware-Wallet-Schnittstelle (HWI) auf 3.1.0 und Spectrum auf 0.8.0. Siehe die Upstream-Versionshinweise: https://github.com/cryptoadvance/specter-desktop/releases/tag/v2.1.10. Enthält außerdem interne Aktualisierungen für start-sdk 2.0.',
    pl_PL:
      'Zaktualizowano Specter do 2.1.10. Podnosi interfejs portfeli sprzętowych (HWI) do 3.1.0 oraz Spectrum do 0.8.0. Zobacz informacje o wydaniu: https://github.com/cryptoadvance/specter-desktop/releases/tag/v2.1.10. Zawiera również wewnętrzne aktualizacje dla start-sdk 2.0.',
    fr_FR:
      'Specter mis à jour vers 2.1.10. Met à jour l’interface des portefeuilles matériels (HWI) vers 3.1.0 et Spectrum vers 0.8.0. Voir les notes de version : https://github.com/cryptoadvance/specter-desktop/releases/tag/v2.1.10. Inclut également des mises à jour internes pour start-sdk 2.0.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
