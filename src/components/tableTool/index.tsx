import {useMemo, useState} from 'react'
import {RenderActiveView} from './RenderActiveView'
import {Breadcrumb, View} from './types'
import {ViewContext} from './context/ViewContext'
import {BreadcrumbsContext} from './context/BreadcrumbsContext'
import {defaultBreadcrumbs, defaultView} from './context/defaultContextValues'
import {RenderBreadcrumbs} from './RenderBreadcrumbs'
import {BreadcrumbsHandler} from './breadcrumbsHandler'

export const TableTool = () => {
  const [view, setView] = useState<View>({...defaultView})
  const [breadcrumbs, setBreadCrumbs] = useState<Breadcrumb[]>([{...defaultBreadcrumbs}])

  const breadcrumbsHandler = useMemo(() => new BreadcrumbsHandler(breadcrumbs, setBreadCrumbs), [])

  return (
    <ViewContext.Provider value={[view, setView]}>
      <BreadcrumbsContext.Provider value={[breadcrumbs, breadcrumbsHandler]}>
        <div>
          <RenderBreadcrumbs />
          <RenderActiveView />
        </div>
      </BreadcrumbsContext.Provider>
    </ViewContext.Provider>
  )
}
