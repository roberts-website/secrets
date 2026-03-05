/// external dependencies.

import { useState } from 'react'

import {
  faFileExport,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { Collection } from '@/types/Collection'

// components.

import IconButton from '@/components/IconButton'

/// helpers.

function generateFilename(collection: Collection, filename: string | null): string {
  if (filename && filename != 'untitled.secrets')
    return filename

  if (collection.title.length > 0)
    return `${collection.title.replace(/\s+/g, '-')}.secrets`

  return 'untitled.secrets'
}

function saveAsFile(collection: Collection, filename: string | null): void {
  const a    = document.createElement('a')
  const blob = new Blob([JSON.stringify(collection, null, 2)], { type: 'application/json' })

  const url = URL.createObjectURL(blob)
  
  a.href     = url
  a.download = generateFilename(collection, filename)

  a.click()

  URL.revokeObjectURL(url)
}

/// component.

export default function FileManager({
  collection,
  setCollection,
}: {
  collection:    Collection
  setCollection: (collection: Collection) => void
}) {
  const [filename, setFilename] = useState<string | null>(null)

  return <div className='flex flex-col md:flex-row gap-4'>
    <input
      className='flex-1'

      type='text'
      
      value      ={collection.title}
      placeholder='collection title.'

      onChange={e => setCollection({
        ...collection,
        title: e.target.value,
      })}
    />

    <div className='flex flex-row gap-4'>
      <IconButton
        className='flex-1 md:flex-none'

        icon={faFileImport}

        onClick={() => {}}
      >
        import.
      </IconButton>
      
      <IconButton
        className='flex-1 md:flex-none'

        icon={faFileExport}
        
        onClick={() => saveAsFile(collection, filename)}
      >
        export.
      </IconButton>
    </div>
  </div>
}