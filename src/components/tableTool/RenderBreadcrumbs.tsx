import {Breadcrumb} from './types'
import {useViewHandler} from './hooks/useViewHandler'

export const RenderBreadcrumbs = () => {
  const viewHandler = useViewHandler()

  function handleBreadcrumbClick(breadcrumb: Breadcrumb) {
    viewHandler.gotoBreadcrumbIndex(breadcrumb.index)
  }

  return (
    <>
      {viewHandler.getBreadcrumbs().map((pathItem, index) => (
        <span key={pathItem.index} onClick={() => handleBreadcrumbClick(pathItem)}>
          {index === viewHandler.getBreadcrumbs().length - 1
            ? pathItem.title
            : `${pathItem.title} / `}
        </span>
      ))}
    </>
  )
}
