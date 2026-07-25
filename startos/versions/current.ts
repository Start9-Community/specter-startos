import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.10:3',
  releaseNotes: {
    en_US: `Keeps the connection to your Bitcoin backend working when that backend changes how it serves TLS.

Specter resolved its backend's address from a field that is only populated for one of the two ways a service can publish a port. It now reads the address itself, which is correct either way — so the connection to Bitcoin Core, electrs or Fulcrum survives the backend's next update instead of going unreachable.`,
    es_ES: `Mantiene la conexión con tu backend de Bitcoin cuando ese backend cambia su forma de servir TLS.

Specter resolvía la dirección de su backend a partir de un campo que solo se rellena en una de las dos formas en que un servicio puede publicar un puerto. Ahora lee la dirección en sí, que es correcta en ambos casos, así que la conexión con Bitcoin Core, electrs o Fulcrum sobrevive a la próxima actualización del backend en lugar de quedar inaccesible.`,
    de_DE: `Hält die Verbindung zu deinem Bitcoin-Backend aufrecht, wenn dieses Backend die Art der TLS-Bereitstellung ändert.

Specter ermittelte die Adresse seines Backends aus einem Feld, das nur bei einer der beiden Arten gefüllt ist, auf die ein Dienst einen Port veröffentlichen kann. Jetzt wird die Adresse selbst gelesen, die in beiden Fällen stimmt — die Verbindung zu Bitcoin Core, electrs oder Fulcrum übersteht damit das nächste Update des Backends, statt unerreichbar zu werden.`,
    pl_PL: `Utrzymuje połączenie z Twoim backendem Bitcoina, gdy ten backend zmienia sposób udostępniania TLS.

Specter ustalał adres swojego backendu na podstawie pola wypełnianego tylko przy jednym z dwóch sposobów publikowania portu przez usługę. Teraz odczytuje sam adres, poprawny w obu przypadkach — dzięki temu połączenie z Bitcoin Core, electrs lub Fulcrum przetrwa kolejną aktualizację backendu, zamiast stać się nieosiągalne.`,
    fr_FR: `Maintient la connexion à votre backend Bitcoin lorsque celui-ci change sa façon de servir TLS.

Specter déterminait l’adresse de son backend à partir d’un champ renseigné dans un seul des deux modes de publication d’un port par un service. Il lit désormais l’adresse elle-même, correcte dans les deux cas — la connexion à Bitcoin Core, electrs ou Fulcrum survit donc à la prochaine mise à jour du backend au lieu de devenir injoignable.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
