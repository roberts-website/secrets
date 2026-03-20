import {
  type ReactNode,
  useCallback,
  useState,
} from 'react'

import type { CollectionV2 } from '@/types/Collection'

import { CollectionContext } from './collection-context'

export function CollectionProvider({
  children,
}: {
  children: ReactNode
}) {
  const [collection, setCollection] = useState<CollectionV2>(() => ({
    version: 2,
    title:   '',
    secrets: [],
  }))

  const [tagSet, setTagSet] = useState<Set<string>>(() => new Set())

  const updateTagSet = useCallback(() => {
    setTagSet(new Set(collection.secrets.flatMap(secret => secret.tags).sort()))
  }, [collection])

  return <CollectionContext.Provider
    value={{
      collection,
      setCollection,
      tagSet,
      updateTagSet,
    }}
  >
    {children}
  </CollectionContext.Provider>
}
