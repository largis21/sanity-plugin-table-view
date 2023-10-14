import {definePlugin} from 'sanity'
import {OpenTableView} from './actions/OpenTableView'
import {TableViewTool} from './tools/table/'

type TableViewConfig = {
  excludedDocumentTypes?: {
    type: string
  }[]
}

const defaultConfig: TableViewConfig = {
  excludedDocumentTypes: [],
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {tableView} from 'sanity-plugin-table-view'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [tableView({...config})],
 * })
 * ```
 */
export const tableView = definePlugin<TableViewConfig | void>((_config) => {
  const config: TableViewConfig = {
    ...defaultConfig,
    ..._config,
  }

  return {
    name: 'sanity-plugin-table-view',
    document: {
      actions: (prev, context) => {
        if (config.excludedDocumentTypes?.find((e) => e.type === context.schemaType)) {
          return prev
        }

        return [...prev, OpenTableView]
      },
    },
    tools: (prev, _context) => {
      return [...prev, TableViewTool()]
    },
  }
})
