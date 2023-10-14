type ViewBase = {}

export type DocumentTypesListView = {
  viewType: 'documentTypesList'
  options: {}
} & ViewBase

export type DocumentTypeEntriesView = {
  viewType: 'documentTypeEntries'
  options: {
    schemaType: string
  }
} & ViewBase

export type View = DocumentTypesListView | DocumentTypeEntriesView

export type Breadcrumb = {view: View; title: string; index: number}
