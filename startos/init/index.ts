import { actions } from '../actions'
import { restoreInit } from '../backups'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { versionGraph } from '../versions'
import { promptSelectNode } from './promptSelectNode'
import { seedMigrationData } from './seedMigrationData'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  actions,
  dependencies,
  seedMigrationData,
  promptSelectNode,
)

export const uninit = sdk.setupUninit(versionGraph)
