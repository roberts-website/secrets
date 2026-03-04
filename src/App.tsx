/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState        } from 'react'

import {
  faFileExport,
  faFileImport,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import type { Collection } from '@/types/Collection'

/// component.

function App() {
  const [collection, setCollection] = useState<Collection>({
    title:   '',
    secrets: [],
  })

  return <div className='flex flex-col gap-8 w-3/5 mx-auto py-4 h-screen'>
    <h1 className='text-7xl font-bold'>
      robert's dirty little secrets.
    </h1>

    <div className='flex flex-row gap-4'>
      <input
        className='flex-1'

        type='text'
        
        value      ={collection.title}
        placeholder='collection title.'

        onChange={e => setCollection({ ...collection, title: e.target.value })}
      />
      <button>
        <FontAwesomeIcon
          className='mr-2'

          icon={faFileImport}
        />
        import.
      </button>
      <button>
        <FontAwesomeIcon
          className='mr-2'

          icon={faFileExport}
        />
        export.
      </button>
    </div>

    <div className='flex-1'>
      <button
      >
        <FontAwesomeIcon
          className='mr-2'

          icon={faPlus}
        />
        new secret.
      </button>
    </div>
  </div>
}

export default App
