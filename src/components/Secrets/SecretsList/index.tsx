/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type {
  CollectionV2,
  SecretV2,
} from '@/types/Collection'

// components.

import SecretsListItem from './SecretsListItem'

import SecretModal from '@/components/SecretModal'

/// component.

export default function SecretsList({
  collection,
  setCollection,
}: {
  collection:    CollectionV2
  setCollection: (collection: CollectionV2) => void
}) {
  const [isEditing, setIsEditing] = useState<boolean      >(false)
  const [editingID, setEditingID] = useState<string | null>(null )

  return <div className='flex flex-col gap-4'>
    {collection.secrets.map(secret => (
      <SecretsListItem
        key   ={secret.id}
        secret={secret}

        onEdit={() => {
          setIsEditing(true)
          setEditingID(secret.id)
        }}

        onMoveUp={() => {
          const index = collection.secrets.findIndex(s => s.id === secret.id)

          if (index === 0) return

          const updatedSecrets = [...collection.secrets]

          updatedSecrets[index    ] = updatedSecrets[index - 1]
          updatedSecrets[index - 1] = secret

          setCollection({ ...collection, secrets: updatedSecrets })
        }}

        onMoveDown={() => {
          const index = collection.secrets.findIndex(s => s.id === secret.id)

          if (index === collection.secrets.length - 1) return

          const updatedSecrets = [...collection.secrets]

          updatedSecrets[index    ] = updatedSecrets[index + 1]
          updatedSecrets[index + 1] = secret

          setCollection({ ...collection, secrets: updatedSecrets })
        }}

        onDelete={() => {
          const updatedSecrets = collection.secrets.filter(s => s.id !== secret.id)

          setCollection({ ...collection, secrets: updatedSecrets })
        }}
      />
    ))}

    {isEditing && editingID && <SecretModal
      secret={collection.secrets.find(secret => secret.id === editingID)}
      
      onClose={() => setIsEditing(false)}
      
      onUpdate={secret => {
        const updatedSecrets = collection.secrets.map((s: SecretV2) => {
          return s.id !== editingID ? s : {
            ...secret,
            createdAt: s.createdAt,
            updatedAt: Date.now(),
          }
        })

        setCollection({ ...collection, secrets: updatedSecrets })

        setIsEditing(false)
        setEditingID(null)
      }}
    />}
  </div>
}