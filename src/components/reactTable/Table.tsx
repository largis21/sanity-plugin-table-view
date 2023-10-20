import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'

export const Table = ({columns, data}: {columns: ColumnDef<unknown, any>[]; data: unknown}) => {
  if (typeof data !== 'object') throw new Error('Data must be json')

  let tableData: any[]
  if (Array.isArray(data)) {
    tableData = data
  } else {
    tableData = [data]
  }

  const table = useReactTable({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
