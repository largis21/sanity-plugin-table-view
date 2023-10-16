import {HTMLAttributes} from 'react'

export const CellBodyComponent = (props: HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      {...props}
      style={{
        border: '1px solid gray',
        padding: '4px',
        display: 'block',
        height: '100%',
        ...props?.style,
      }}
    >
      {props.children}
    </td>
  )
}
