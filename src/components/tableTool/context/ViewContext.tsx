import {Dispatch, SetStateAction, createContext} from 'react'
import {defaultView} from './defaultContextValues'
import {View} from '../types'

export const ViewContext = createContext<[View, Dispatch<SetStateAction<View>> | null]>([
  {...defaultView},
  null,
])
