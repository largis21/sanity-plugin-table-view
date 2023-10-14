import {definePlugin} from 'sanity'
import {OpenTableView} from './actions/OpenTableView'
import {TableViewTool} from './tools/table/'

type SanityJsonConfig = {
  excludedDocumentTypes?: {
    type: string
  }[]
}

const defaultConfig: SanityJsonConfig = {
  excludedDocumentTypes: [],
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-sanity-json'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [sanityJson({...config})],
 * })
 * ```
 */
export const sanityJson = definePlugin<SanityJsonConfig | void>((_config) => {
  const config: SanityJsonConfig = {
    ...defaultConfig,
    ..._config,
  }

  return {
    name: 'sanity-plugin-sanity-json',
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
