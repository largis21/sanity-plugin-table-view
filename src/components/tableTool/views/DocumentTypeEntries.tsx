import {ReactNode, useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {useToast} from '@sanity/ui'
import {DocumentTypeEntriesView, JsonView} from '../types'
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import {CellBodyComponent} from '../../reactTable/Cell'
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

  function handleObjectClick(data: JsonView['options']['data'], title: string) {
    viewHandler.push(
      {
        viewType: 'jsonView',
        options: {
          data,
        },
      },
      title,
    )
  }

  useEffect(() => {
    setColumns(getColumnsFromEntries(entries, handleObjectClick))
    setEntriesLoaded(true)
  }, [entries, toast, view])

  async function getEntries() {
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
  }

  const table = useReactTable({
    data: entries,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    getEntries()
  }, [])

  if (!entriesLoaded) {
    return <>Loading...</>
  }

  return (
    <table style={{borderCollapse: 'collapse'}}>
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
          <tr key={row.id} style={{borderCollapse: 'collapse'}}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id} style={{padding: '0'}}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function getColumnsFromEntries(
  entries: unknown[],
  handleObjectClick: (data: JsonView['options']['data'], title: string) => void,
): ColumnDef<unknown, any>[] {
  const fields: string[] = []

  entries.forEach((entry) => {
    if (!entry || typeof entry !== 'object') return

    Object.keys(entry).forEach((field) => {
      if (fields.includes(field)) return
      fields.push(field)
    })
  })

  return fields.map((field) => ({
    accessorKey: field,
    header: (cell) => {
      return <CellBodyComponent>{cell.column.id}</CellBodyComponent>
    },
    cell: (cell) => {
      const cellValue = cell.getValue()

      switch (typeof cellValue) {
        case 'string':
          return <CellBodyComponent>{cell.getValue() as ReactNode}</CellBodyComponent>
        case 'object':
          if (Array.isArray(cellValue)) {
            return (
              <CellBodyComponent
                onClick={() => handleObjectClick(cellValue as JsonView['options']['data'], cell.column.id)}
                /* safe cast??? */
              >
                [Array]
              </CellBodyComponent>
            )
          }

          if (cellValue.hasOwnProperty('_type') && cellValue.hasOwnProperty('_ref')) {
            if (cellValue._type === 'reference') {
              return <CellBodyComponent>[Reference]</CellBodyComponent>
            }
          }

          return (
            <CellBodyComponent
              onClick={() => handleObjectClick(cellValue as JsonView['options']['data'])}
              /* safe cast??? */
            >
              [Object]
            </CellBodyComponent>
          )
        default:
          return <CellBodyComponent> </CellBodyComponent>
      }
    },
  }))
}
