import {Tool} from 'sanity'
import {TableTool} from '../../components/tableTool'

export const TableViewTool = (): Tool => {
  return {
    name: 'tableView',
    component: (props) => <TableTool />,
    title: 'Table View',
  }
}
