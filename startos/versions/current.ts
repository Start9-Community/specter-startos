import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.11:0',
  releaseNotes: {
    en_US: `Specter Desktop 2.1.11, and hardware wallet instructions that say how to do it.

Upstream puts the HWI bridge settings page — the one you use to reach a hardware wallet plugged into your own machine — behind an admin login and CSRF protection. It also validates active API tokens, retries a wallet import with a widened address range when the first attempt is refused, stops a slow Swan request hanging the app, warns at device setup about the Coldcard Mk3 seed-entropy advisory, warns that logging in to Specter does not encrypt its data folder, and picks up security updates to jinja2, certifi and several bundled libraries.

The Hardware Wallets section of the Instructions tab pointed at a page that no longer exists. It now explains the real constraint — Specter runs on your server, so a hardware wallet plugged into the machine you browse from is not visible to it over USB — and covers both ways round that: air-gapped signing by QR or SD card, and HWIBridge.`,
    es_ES: `Specter Desktop 2.1.11, e instrucciones sobre carteras de hardware que explican cómo hacerlo.

Upstream coloca la página de ajustes del puente HWI —la que usas para llegar a una cartera de hardware conectada a tu propio equipo— detrás de un inicio de sesión de administrador y de protección CSRF. También valida los tokens de API activos, reintenta la importación de una cartera con un rango de direcciones ampliado cuando el primer intento es rechazado, evita que una petición lenta a Swan bloquee la aplicación, avisa durante la configuración del dispositivo del aviso sobre la entropía de semilla del Coldcard Mk3, advierte de que iniciar sesión en Specter no cifra su carpeta de datos, e incorpora actualizaciones de seguridad de jinja2, certifi y varias bibliotecas incluidas.

La sección Carteras de hardware de la pestaña Instrucciones enlazaba a una página que ya no existe. Ahora explica la limitación real —Specter se ejecuta en tu servidor, así que una cartera de hardware conectada al equipo desde el que navegas no le resulta visible por USB— y cubre las dos formas de resolverlo: la firma air-gapped por QR o tarjeta SD, y HWIBridge.`,
    de_DE: `Specter Desktop 2.1.11, und eine Anleitung zu Hardware-Wallets, die erklärt, wie es geht.

Upstream stellt die Einstellungsseite der HWI-Bridge — die, über die du eine an deinem eigenen Rechner angeschlossene Hardware-Wallet erreichst — hinter eine Admin-Anmeldung und CSRF-Schutz. Außerdem werden aktive API-Token validiert, ein Wallet-Import bei Ablehnung mit erweitertem Adressbereich wiederholt, eine langsame Swan-Anfrage kann die Anwendung nicht mehr blockieren, bei der Geräteeinrichtung wird auf den Hinweis zur Seed-Entropie der Coldcard Mk3 aufmerksam gemacht, es wird gewarnt, dass die Anmeldung bei Specter den Datenordner nicht verschlüsselt, und es kommen Sicherheitsupdates für jinja2, certifi und mehrere mitgelieferte Bibliotheken hinzu.

Der Abschnitt Hardware-Wallets im Reiter Anleitung verwies auf eine Seite, die es nicht mehr gibt. Er erklärt jetzt die eigentliche Einschränkung — Specter läuft auf deinem Server, eine am Browser-Rechner angeschlossene Hardware-Wallet ist für ihn also über USB nicht sichtbar — und behandelt beide Wege drumherum: Air-Gapped-Signieren per QR-Code oder SD-Karte, und HWIBridge.`,
    pl_PL: `Specter Desktop 2.1.11 oraz instrukcje dotyczące portfeli sprzętowych, które mówią, jak to zrobić.

Upstream umieszcza stronę ustawień mostka HWI — tę, przez którą sięgasz po portfel sprzętowy podłączony do własnego komputera — za logowaniem administratora i ochroną CSRF. Waliduje też aktywne tokeny API, ponawia import portfela z poszerzonym zakresem adresów, gdy pierwsza próba zostanie odrzucona, nie pozwala powolnemu żądaniu do Swan zawiesić aplikacji, ostrzega przy konfiguracji urządzenia o komunikacie dotyczącym entropii ziarna w Coldcard Mk3, ostrzega, że zalogowanie się do Spectera nie szyfruje jego folderu danych, i przynosi aktualizacje bezpieczeństwa jinja2, certifi oraz kilku dołączonych bibliotek.

Sekcja Portfele sprzętowe w zakładce Instrukcje odsyłała do strony, która już nie istnieje. Teraz wyjaśnia rzeczywiste ograniczenie — Specter działa na Twoim serwerze, więc portfel sprzętowy podłączony do komputera, z którego przeglądasz, nie jest dla niego widoczny przez USB — i opisuje oba sposoby obejścia tego: podpisywanie air-gapped przez kod QR lub kartę SD oraz HWIBridge.`,
    fr_FR: `Specter Desktop 2.1.11, et des instructions sur les portefeuilles matériels qui expliquent comment faire.

En amont, la page de réglages du pont HWI — celle qui vous sert à atteindre un portefeuille matériel branché sur votre propre machine — passe derrière une connexion administrateur et une protection CSRF. Specter valide aussi les jetons d'API actifs, réessaie l'import d'un portefeuille avec une plage d'adresses élargie lorsque la première tentative est refusée, empêche une requête Swan lente de bloquer l'application, signale lors de la configuration d'un appareil l'avis sur l'entropie de graine du Coldcard Mk3, avertit que se connecter à Specter ne chiffre pas son dossier de données, et intègre des mises à jour de sécurité de jinja2, certifi et plusieurs bibliothèques embarquées.

La section Portefeuilles matériels de l'onglet Instructions renvoyait vers une page qui n'existe plus. Elle explique désormais la vraie contrainte — Specter s'exécute sur votre serveur, un portefeuille matériel branché sur la machine depuis laquelle vous naviguez ne lui est donc pas visible en USB — et couvre les deux façons de contourner cela : la signature air-gapped par QR code ou carte SD, et HWIBridge.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
