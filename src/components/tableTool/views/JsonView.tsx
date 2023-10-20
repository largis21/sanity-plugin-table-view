import {useCallback, useMemo} from 'react'
import {JsonView as JsonViewType} from '../types'
import {Table, getColumns} from '../../reactTable'
import {useViewHandler} from '../hooks/useViewHandler'

export const JsonView = ({view}: {view: JsonViewType}) => {
  const viewHandler = useViewHandler()

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

  const {columns, data} = useMemo(
    () => ({
      columns: getColumns(view.options.data, handleCellClick),
      data: view.options.data,
    }),
    [view, handleCellClick],
  )

  return <Table columns={columns} data={data} />
}
