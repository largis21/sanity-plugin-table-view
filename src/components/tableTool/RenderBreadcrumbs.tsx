import {useContext} from 'react'
import {BreadcrumbsContext} from './context/BreadcrumbsContext'
import {Breadcrumb} from './types'
import {ViewContext} from './context/ViewContext'
import {useToast} from '@sanity/ui'

export const RenderBreadcrumbs = () => {
  const toast = useToast()

  const [breadcrumbs, breadcrumbsHandler] = useContext(BreadcrumbsContext)
  const [view, setView] = useContext(ViewContext)

  function handleBreadcrumbClick(breadcrumb: Breadcrumb) {
    if (!setView) {
      console.error('setView is not defined')
      toast.push({
        title: 'Error setting view',
        status: 'error',
        description: 'See console for errors',
      })

      return
    }

    breadcrumbsHandler?.popToIndex(breadcrumb.index)

    setView({...breadcrumb.view})
  }

  return (
    <>
      {breadcrumbs.map((pathItem, index) => (
        <span key={pathItem.index} onClick={() => handleBreadcrumbClick(pathItem)}>
          {index === breadcrumbs.length - 1 ? pathItem.title : `${pathItem.title} / `}
        </span>
      ))}
    </>
  )
}
