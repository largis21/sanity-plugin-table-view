import {Schema, DocumentDefinition} from 'sanity'

export const getDocumentTypes = (schema: Schema): DocumentDefinition[] => {
  const documentTypes: DocumentDefinition[] = []

  schema._original?.types.forEach((schemaType) => {
    if (schemaType.type === 'document') {
      documentTypes.push(schemaType as DocumentDefinition)
    }
  })

  return documentTypes
}
