import {ReactNode} from 'react'
import {useViewHandler} from './hooks/useViewHandler'
import {DocumentTypesList} from './views/DocumentTypesList'
import {DocumentTypeEntries} from './views/DocumentTypeEntries'

export const RenderActiveView = (): ReactNode => {
  const viewHandler = useViewHandler()
  const currentView = viewHandler.getCurrentView()

  switch (currentView.viewType) {
    case 'documentTypesList':
      return <DocumentTypesList />
    case 'documentTypeEntries':
      return <DocumentTypeEntries view={currentView} />
    default:
      return <></>
  }
}
