import {createContext} from 'react'
import {Breadcrumb} from '../types'
import {defaultBreadcrumbs} from './defaultContextValues'
import {BreadcrumbsHandler} from '../breadcrumbsHandler'

export const BreadcrumbsContext = createContext<[Breadcrumb[], BreadcrumbsHandler | null]>([
  [{...defaultBreadcrumbs}],
  null,
])
