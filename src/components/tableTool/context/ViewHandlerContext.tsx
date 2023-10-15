import {Dispatch, ReactNode, SetStateAction, createContext, useState} from 'react'
import {Breadcrumb, View} from '../types'
import {defaultBreadcrumbs, defaultView} from './defaultContextValues'

export type ViewHandler = {
  _view: {
    view: View
    setView: Dispatch<SetStateAction<View>>
  }
  _breadcrumbs: {
    breadcrumbs: Breadcrumb[]
    setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>
  }
  push: (newView: View, title?: string) => void
  getBreadcrumbs: () => Breadcrumb[]
  getCurrentView: () => View
  gotoBreadcrumbIndex: (index: number) => void
}

export const ViewHandlerContext = createContext<ViewHandler | null>(null)

export const ViewHandlerProvider = (props: {children: ReactNode}) => {
  const [view, setView] = useState<View>({...defaultView})
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([{...defaultBreadcrumbs}])

  const push = (newView: View, title?: string) => {
    const breadcrumbTitle =
      title ||
      (newView.viewType === 'documentTypeEntries' ? newView.options.schemaType : newView.viewType)

    setBreadcrumbs((curr) => [...curr, {view: newView, title: breadcrumbTitle, index: curr.length}])
    setView(newView)
  }

  const getBreadcrumbs = () => {
    return breadcrumbs
  }

  const getCurrentView = () => {
    return view
  }

  const gotoBreadcrumbIndex = (index: number) => {
    if (index > breadcrumbs.length) return

    setView({...breadcrumbs[index].view})
    setBreadcrumbs((curr) => {
      const newArray = []
      let i = 0

      while (newArray.length - 1 < index) {
        if (!curr[i]) {
          return newArray
        }
        newArray.push(curr[i])
        i++
      }

      return newArray
    })
  }

  const ViewHandlerContextValue: ViewHandler = {
    _view: {view, setView},
    _breadcrumbs: {breadcrumbs, setBreadcrumbs},
    push,
    getBreadcrumbs: getBreadcrumbs,
    getCurrentView: getCurrentView,
    gotoBreadcrumbIndex: gotoBreadcrumbIndex,
  }

  return (
    <ViewHandlerContext.Provider value={ViewHandlerContextValue}>
      {props.children}
    </ViewHandlerContext.Provider>
  )
}
