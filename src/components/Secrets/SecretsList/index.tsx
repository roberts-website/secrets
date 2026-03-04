/// internal dependencies.

// types.

import type { Collection } from '@/types/Collection'

// components.

import SecretsListItem from './SecretsListItem'

/// component.

export default function SecretsList({
  collection,
  setCollection,
}: {
  collection:    Collection
  setCollection: (collection: Collection) => void
}) {
  return <div className='flex flex-col gap-4'>
    {collection.secrets.map(secret => (
      <SecretsListItem
        key   ={secret.id}
        secret={secret}
      />
    ))}
  </div>
}