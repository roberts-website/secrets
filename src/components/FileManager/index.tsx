/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// contexts.

import { useCollection } from '@/contexts/Collection'

// components.

import Export from './Export'
import Import from './Import'

/// component.

export default function FileManager() {
  const { collection, setCollection } = useCollection()

  const [filename, setFilename] = useState<string | null>(null)

  return <div className='flex flex-col md:flex-row gap-4'>
    <input
      className  ='flex-1'
      placeholder='collection title.'
      type       ='text'
      value      ={collection.title}

      onChange={e => setCollection({
        ...collection,
        title: e.target.value,
      })}
    />

    <div className='flex flex-row gap-4'>
      <Import setFilename={setFilename} />
      <Export filename={filename} />
    </div>
  </div>
}