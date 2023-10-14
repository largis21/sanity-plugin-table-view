import {ReactNode, useContext} from 'react'
import {DocumentTypesList} from './views/DocumentTypesList'
import {ViewContext} from './context/ViewContext'
import {DocumentTypeEntries} from './views/DocumentTypeEntries'

export const RenderActiveView = (): ReactNode => {
  const [view] = useContext(ViewContext)

  switch (view?.viewType) {
    case 'documentTypesList':
      return <DocumentTypesList />
    case 'documentTypeEntries':
      return <DocumentTypeEntries />
    default:
      return <></>
  }
}
