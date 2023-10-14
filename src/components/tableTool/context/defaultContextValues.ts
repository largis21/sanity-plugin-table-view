import {Breadcrumb, DocumentTypesListView} from '../types'

export const defaultView: DocumentTypesListView = {
  viewType: 'documentTypesList',
  options: {},
}

export const defaultBreadcrumbs: Breadcrumb = {
  view: {...defaultView},
  title: 'Document types',
  index: 0,
}
