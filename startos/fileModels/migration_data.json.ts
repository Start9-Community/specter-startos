import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// Specter Desktop ships two unconditional migrations
// (`SpecterMigration_0001` "Single-Node" and `SpecterMigration_0002`
// "Node-class") that run on every first daemon start. _0002 rewrites every
// `nodes/*.json` to either `InternalNode` (no `external_node` field) or the
// generic external `Node` (`external_node: true`). Neither branch knows about
// SpectrumNode, so it always clobbers our `spectrum_node.json`.
//
// Workaround: pre-write `migration_data.json` marking ids 1 and 2 as
// already executed so the migrator's `has_migration_executed` check skips
// them. Both migrations are no-ops on a fresh StartOS volume anyway
// (_0001 only acts if a legacy `~/.specter/.bitcoin` exists; _0002 mangles
// node files).
const execution = z.object({
  timestamp: z.string(),
  migration_id: z.number().int(),
  status: z.literal('completed'),
  executing_version: z.string(),
})

const event = z.object({
  timestamp: z.string(),
  version: z.string(),
})

const shape = z.object({
  events: z.array(event),
  migration_executions: z.array(execution),
})

export const migrationDataJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '.specter/migration_data.json' },
  shape,
)

const FIXED_TIMESTAMP = '2000-01-01 00:00:00.000000'
const FIRST_EVENT_VERSION = 'v2.1.8'

export const PRE_EXECUTED_MIGRATIONS = {
  events: [{ timestamp: FIXED_TIMESTAMP, version: FIRST_EVENT_VERSION }],
  migration_executions: [
    {
      timestamp: FIXED_TIMESTAMP,
      migration_id: 1,
      status: 'completed' as const,
      executing_version: FIRST_EVENT_VERSION,
    },
    {
      timestamp: FIXED_TIMESTAMP,
      migration_id: 2,
      status: 'completed' as const,
      executing_version: FIRST_EVENT_VERSION,
    },
  ],
}
