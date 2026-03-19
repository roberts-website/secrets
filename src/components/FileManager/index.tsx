/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type { CollectionV2 } from '@/types/Collection'

// components.

import Export from './Export'
import Import from './Import'

/// component.

export default function FileManager({
  collection,
  setCollection,
}: {
  collection:    CollectionV2
  setCollection: (collection: CollectionV2) => void
}) {
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
      <Import
        setCollection={setCollection}
        setFilename  ={setFilename}
      />
      
      <Export
        collection={collection}
        filename  ={filename}
      />
    </div>
  </div>
}