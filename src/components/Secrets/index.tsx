/// external dependencies.

import { faPlus   } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

/// internal dependencies.

// types.

import type {
  CollectionV2,
  SecretV2,
} from '@/types/Collection'

// components.

import SecretModal from '../SecretModal'
import SecretsList    from './SecretsList'

import Button from '@/components/Form/Button'

/// component.

export default function Secrets({
  collection,
  setCollection,
}: {
  collection:    CollectionV2
  setCollection: (collection: CollectionV2) => void
}) {
  const [showingNewModal, setShowingNewModal] = useState(false)

  return <div className='flex-1 flex flex-col gap-4'>
    <Button
      className='w-fit'

      icon   ={faPlus}
      onClick={() => setShowingNewModal(true)}
    >
      new secret.
    </Button>

    <SecretsList
      collection   ={collection}
      setCollection={setCollection}
    />

    {showingNewModal && <SecretModal
      onClose={() => setShowingNewModal(false)}

      onUpdate={(secret: SecretV2) => {
        setCollection({
          ...collection,
          secrets: [...collection.secrets, secret],
        })

        setShowingNewModal(false)
      }}
    />}
  </div>
}