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

export type JsonView = {
  viewType: 'jsonView'
  options: {
    data: {[key: string]: any} | {[key: string]: any}[]
  }
}

export type View = DocumentTypesListView | DocumentTypeEntriesView | JsonView

export type Breadcrumb = {view: View; title: string; index: number}
