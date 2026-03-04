/// external dependencies.

import { faPlus   } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

/// internal dependencies.

// types.

import type { Collection } from '@/types/Collection'

// components.

import NewSecretModal from './NewSecretModal'
import SecretsList    from './SecretsList'

import IconButton from '@/components/IconButton'

/// component.

export default function Secrets({
  collection,
  setCollection,
}: {
  collection:    Collection
  setCollection: (collection: Collection) => void
}) {
  const [showingNewModal, setShowingNewModal] = useState(false)

  return <div className='flex-1 flex flex-col gap-4'>
    <IconButton
      className='w-fit'

      icon   ={faPlus}
      onClick={() => setShowingNewModal(true)}
    >
      new secret.
    </IconButton>

    <SecretsList
      collection   ={collection}
      setCollection={setCollection}
    />

    {showingNewModal && <NewSecretModal
      onClose={() => setShowingNewModal(false)}

      onCreate={secret => {
        setCollection({
          ...collection,
          secrets: [...collection.secrets, secret],
        })

        setShowingNewModal(false)
      }}
    />}
  </div>
}