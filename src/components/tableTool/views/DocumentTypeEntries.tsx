import {useContext, useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {useToast} from '@sanity/ui'
import {ViewContext} from '../context/ViewContext'
import {DocumentTypeEntriesView} from '../types'
import {defaultView} from '../context/defaultContextValues'

export const DocumentTypeEntries = () => {
  const client = useClient()
  const toast = useToast()

  const [entries, setEntries] = useState([])

  const [view, setView] = useContext(ViewContext)

  async function getEntries(entriesView: DocumentTypeEntriesView) {
    try {
      const fetchedEntries = await client.fetch(`*[_type == '${entriesView.options.schemaType}']`)
      setEntries(fetchedEntries)
    } catch (e) {
      toast.push({
        title: `Error fetching documents with type '${entriesView.options.schemaType}'`,
        status: 'error',
        description: 'See console for errors',
      })
      console.error(e)
    }
  }

  useEffect(() => {
    if (view.viewType !== 'documentTypeEntries') {
      if (!setView) {
        throw new Error('Wrong view component rendered and cannot set correct view')
      }

      setView({...defaultView})
    }

    getEntries(view as DocumentTypeEntriesView) // Narrowed above
  }, [])

  return (
    <div>
      {entries.map((entry) => (
        <>{JSON.stringify(entry)}</>
      ))}
    </div>
  )
}
