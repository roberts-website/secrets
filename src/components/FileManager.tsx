/// external dependencies.

import {
  faFileExport,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { Collection } from '@/types/Collection'

// components.

import IconButton from '@/components/IconButton'

/// component.

export default function FileManager({
  collection,
  setCollection,
}: {
  collection:    Collection
  setCollection: (collection: Collection) => void
}) {
  return <div className='flex flex-row gap-4'>
    <input
      className='flex-1'

      type='text'
      
      value      ={collection.title}
      placeholder='collection title.'

      onChange={e => setCollection({ ...collection, title: e.target.value })}
    />
    <IconButton
      icon={faFileImport}
      onClick={() => {}}
    >
      import.
    </IconButton>
    <IconButton
      icon={faFileExport}
      onClick={() => {}}
    >
      export.
    </IconButton>
  </div>
}