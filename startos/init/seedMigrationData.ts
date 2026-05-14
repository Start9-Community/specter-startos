import {
  migrationDataJson,
  PRE_EXECUTED_MIGRATIONS,
} from '../fileModels/migration_data.json'
import { sdk } from '../sdk'

// See fileModels/migration_data.json.ts for the full rationale. Specter's
// migration_0002 corrupts SpectrumNode entries on first daemon start; we
// short-circuit it by claiming both migrations 1 and 2 are already done.
// Idempotent: only writes if no migration_data.json exists yet, so we
// preserve real migration history on update/restore.
export const seedMigrationData = sdk.setupOnInit(async (effects, kind) => {
  if (!kind) return

  const existing = await migrationDataJson
    .read()
    .once()
    .catch(() => null)

  if (existing) return

  await migrationDataJson.write(effects, PRE_EXECUTED_MIGRATIONS)
})
