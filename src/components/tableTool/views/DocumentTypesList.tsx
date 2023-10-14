import {useContext, useEffect, useState} from 'react'
import {DocumentDefinition, useSchema} from 'sanity'
import {getDocumentTypes} from '../../../lib/getDocumentTypes'
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import {ViewContext} from '../context/ViewContext'
import {useToast} from '@sanity/ui'
import {BreadcrumbsContext} from '../context/BreadcrumbsContext'
import { View } from '../types'

const columnHelper = createColumnHelper<DocumentDefinition>()
const columns = [
  columnHelper.accessor('type', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
  }),
]

export const DocumentTypesList = () => {
  const schema = useSchema()
  const toast = useToast()

  const [documentTypes, setDocumentTypes] = useState<DocumentDefinition[]>([])

  const table = useReactTable({
    data: documentTypes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    setDocumentTypes(getDocumentTypes(schema))
  }, [schema])

  const [_, breadcrumbsHandler] = useContext(BreadcrumbsContext)
  const [view, setView] = useContext(ViewContext)

  function handleDocumentTypeClicked(documentTypeName: string) {
    if (!setView) {
      console.error('setView is not defined')
      toast.push({
        title: 'Error changing view',
        description: 'See console for errors',
        status: 'error',
      })

      return
    }

    const newView: View = {
      viewType: 'documentTypeEntries',
      options: {
        schemaType: documentTypeName,
      },
    }

    breadcrumbsHandler?.push({
      title: documentTypeName,
      view: newView,
    })

    setView(newView)
  }

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => handleDocumentTypeClicked(row.original.name)}
            style={{
              cursor: 'pointer',
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
