import {RenderActiveView} from './RenderActiveView'
import {RenderBreadcrumbs} from './RenderBreadcrumbs'
import {ViewHandlerProvider} from './context/ViewHandlerContext'

export const TableTool = () => {
  return (
    <ViewHandlerProvider>
      <RenderBreadcrumbs />
      <RenderActiveView />
    </ViewHandlerProvider>
  )
}
