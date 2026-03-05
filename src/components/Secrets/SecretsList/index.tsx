/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type { Collection } from '@/types/Collection'

// components.

import SecretsListItem from './SecretsListItem'

import SecretModal from '@/components/SecretModal'

/// component.

export default function SecretsList({
  collection,
  setCollection,
}: {
  collection:    Collection
  setCollection: (collection: Collection) => void
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editingID, setEditingID] = useState<string | null>(null)

  return <div className='flex flex-col gap-4'>
    {collection.secrets.map(secret => (
      <SecretsListItem
        key   ={secret.id}
        secret={secret}

        setIsEditing={setIsEditing}
        setEditingID={setEditingID}

        onMoveUp={() => {
          const index = collection.secrets.findIndex(s => s.id === secret.id)

          if (index === 0) return

          const updatedSecrets = [...collection.secrets]
          updatedSecrets[index] = updatedSecrets[index - 1]
          updatedSecrets[index - 1] = secret

          setCollection({ ...collection, secrets: updatedSecrets })
        }}

        onMoveDown={() => {
          const index = collection.secrets.findIndex(s => s.id === secret.id)

          if (index === collection.secrets.length - 1) return

          const updatedSecrets = [...collection.secrets]
          updatedSecrets[index] = updatedSecrets[index + 1]
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
      
      onSave={secret => {
        const updatedSecrets = collection.secrets.map(s => s.id === editingID ? secret : s)

        setCollection({
          ...collection,
          secrets: updatedSecrets,
        })

        setIsEditing(false)
        setEditingID(null)
      }}
    />}
  </div>
}