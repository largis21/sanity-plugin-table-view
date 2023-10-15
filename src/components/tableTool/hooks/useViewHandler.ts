import {useContext} from 'react'
import {ViewHandlerContext, ViewHandler} from '../context/ViewHandlerContext'

export function useViewHandler(): ViewHandler {
  const viewHandler = useContext(ViewHandlerContext)
  if (!viewHandler) throw new Error('Could not find viewHandler context')
  return viewHandler
}
