import {ColumnDef} from '@tanstack/react-table'
import {CellBodyComponent} from './Cell'
import {HTMLAttributes, ReactNode} from 'react'

export function getColumns(
  jsonData: unknown,
  onClick: (newViewTitle: string, cellData: unknown) => any,
  ...props: HTMLAttributes<HTMLTableCellElement>[]
): ColumnDef<unknown, any>[] {
  const fields: string[] = []

  if (!jsonData) throw new Error('Data is null')
  if (typeof jsonData !== 'object') throw new Error('Data is not json')

  if (Array.isArray(jsonData)) {
    jsonData.forEach((jsonObject) => {
      if (!jsonObject || typeof jsonObject !== 'object') return

      Object.keys(jsonObject).forEach((field) => {
        if (fields.includes(field)) return
        fields.push(field)
      })
    })
  } else {
    Object.keys(jsonData).forEach((jsonObject) => {
      if (fields.includes(jsonObject)) return
      fields.push(jsonObject)
    })
  }

  fields.sort()

  return fields.map((field) => ({
    accessorKey: field,
    header: (cell) => {
      return <CellBodyComponent {...props}>{cell.column.id}</CellBodyComponent>
    },
    cell: (cell) => {
      const cellValue = cell.getValue()

      switch (typeof cellValue) {
        case 'string':
          return <CellBodyComponent {...props}>{cell.getValue() as ReactNode}</CellBodyComponent>
        case 'object':
          if (Array.isArray(cellValue)) {
            return (
              <CellBodyComponent
                {...props}
                onClick={() => onClick(cell.column.id, cell.getValue())}
              >
                [Array]
              </CellBodyComponent>
            )
          }

          if (cellValue.hasOwnProperty('_type') && cellValue.hasOwnProperty('_ref')) {
            if (cellValue._type === 'reference') {
              return (
                <CellBodyComponent
                  onClick={() => onClick(cell.column.id, cell.getValue())}
                  {...props}
                >
                  [Reference]
                </CellBodyComponent>
              )
            }
          }

          return (
            <CellBodyComponent onClick={() => onClick(cell.column.id, cell.getValue())} {...props}>
              [Object]
            </CellBodyComponent>
          )
        default:
          return <CellBodyComponent {...props}> </CellBodyComponent>
      }
    },
  }))
}
