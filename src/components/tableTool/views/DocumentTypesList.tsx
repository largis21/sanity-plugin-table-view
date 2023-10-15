import {useEffect, useState} from 'react'
import {DocumentDefinition, useSchema} from 'sanity'
import {getDocumentTypes} from '../../../lib/getDocumentTypes'
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import {View} from '../types'
import {useViewHandler} from '../hooks/useViewHandler'

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
  const viewHandler = useViewHandler()

  const [documentTypes, setDocumentTypes] = useState<DocumentDefinition[]>([])

  const table = useReactTable({
    data: documentTypes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    setDocumentTypes(getDocumentTypes(schema))
  }, [schema])

  function handleDocumentTypeClicked(documentTypeName: string) {
    const newView: View = {
      viewType: 'documentTypeEntries',
      options: {
        schemaType: documentTypeName,
      },
    }

    viewHandler.push(newView, documentTypeName)
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
