import {useCallback, useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {useToast} from '@sanity/ui'
import {DocumentTypeEntriesView} from '../types'
import {ColumnDef} from '@tanstack/react-table'
import {Table, getColumns} from '../../reactTable'
import {useViewHandler} from '../hooks/useViewHandler'

type DocumentTypeEntriesProps = {
  view: DocumentTypeEntriesView
}

export const DocumentTypeEntries = ({view}: DocumentTypeEntriesProps) => {
  const client = useClient()
  const toast = useToast()
  const viewHandler = useViewHandler()

  const [entries, setEntries] = useState<unknown[]>([])
  const [entriesLoaded, setEntriesLoaded] = useState(false)
  const [columns, setColumns] = useState<ColumnDef<unknown, any>[]>([])

  const getEntries = useCallback(async () => {
    try {
      const fetchedEntries = await client.fetch(`*[_type == '${view.options.schemaType}']`)
      if (!fetchedEntries) throw new Error('Error fetching documents')

      setEntries(fetchedEntries)
    } catch (e) {
      toast.push({
        title: `Error fetching documents with type '${view.options.schemaType}'`,
        status: 'error',
        description: 'See console for errors',
      })
      console.error(e)
    }
  }, [client, toast, view.options.schemaType])

  const handleCellClick = useCallback(
    (newViewTitle: string, cellData: unknown) => {
      viewHandler.push(
        {
          viewType: 'jsonView',
          options: {
            data: cellData,
          },
        },
        newViewTitle,
      )
    },
    [viewHandler],
  )

  useEffect(() => {
    setColumns(getColumns(entries, handleCellClick))
    setEntriesLoaded(true)
  }, [entries, toast, view, handleCellClick])

  useEffect(() => {
    getEntries()
  }, [getEntries])

  if (!entriesLoaded) {
    return <>Loading...</>
  }

  return <Table columns={columns} data={entries} />
}
