import {ReactNode} from 'react'

export const CellBodyComponent = (props: {children: ReactNode}) => {
  return (
    <td style={{border: '1px solid gray', padding: '4px', display: 'block', height: "100%"}}>
      {props.children}
    </td>
  )
}
