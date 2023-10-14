import {Dispatch, SetStateAction} from 'react'
import {Breadcrumb} from './types'

export class BreadcrumbsHandler {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>

  constructor(breadcrumbs: Breadcrumb[], setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>) {
    this.breadcrumbs = breadcrumbs
    this.setBreadcrumbs = setBreadcrumbs
  }

  public push(newBreadcrumb: Omit<Breadcrumb, 'index'>): void {
    this.setBreadcrumbs((curr) => [...curr, {...newBreadcrumb, index: curr.length}])
  }

  public popToIndex(newIndex: number): void {
    this.setBreadcrumbs((curr) => {
      const newArray = []
      let i = 0

      while (newArray.length - 1 < newIndex) {
        if (!curr[i]) {
          return newArray
        }
        newArray.push(curr[i])
        i++
      }

      return newArray
    })
  }
}
