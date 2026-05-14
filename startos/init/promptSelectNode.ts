import { selectNode } from '../actions/selectNode'
import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const promptSelectNode = sdk.setupOnInit(async (effects, kind) => {
  if (!kind) return

  const activeNodeAlias = await configJson
    .read((c) => c.active_node_alias)
    .const(effects)
    .catch(() => null)

  if (activeNodeAlias) return

  await sdk.action.createOwnTask(effects, selectNode, 'critical', {
    reason: i18n('Please choose which backend Specter should use.'),
  })
})
