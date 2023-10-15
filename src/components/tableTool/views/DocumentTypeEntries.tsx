import {ReactNode, useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {useToast} from '@sanity/ui'
import {DocumentTypeEntriesView} from '../types'
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import {CellBodyComponent} from '../../reactTable/Cell'

type DocumentTypeEntriesProps = {
  view: DocumentTypeEntriesView
}

export const DocumentTypeEntries = ({view}: DocumentTypeEntriesProps) => {
  const client = useClient()
  const toast = useToast()

  const [entries, setEntries] = useState<unknown[]>([])
  const [entriesLoaded, setEntriesLoaded] = useState(false)
  const [columns, setColumns] = useState<ColumnDef<unknown, any>[]>([])

  useEffect(() => {
    setColumns(getColumnsFromEntries(entries))
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

function getColumnsFromEntries(entries: unknown[]): ColumnDef<unknown, any>[] {
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
            return <CellBodyComponent>[Array]</CellBodyComponent>
          }
          return <CellBodyComponent>[Object]</CellBodyComponent>
        default:
          return <CellBodyComponent> </CellBodyComponent>
      }
    },
  }))
}
