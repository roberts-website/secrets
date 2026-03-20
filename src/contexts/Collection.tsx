/// external dependencies.

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { CollectionV2 } from '@/types/Collection'

/// types.

type CollectionContextValue = {
  collection:    CollectionV2
  setCollection: Dispatch<SetStateAction<CollectionV2>>
  tagSet:        Set<string>
  updateTagSet:  () => void
}

/// context.

const CollectionContext = createContext<CollectionContextValue | null>(null)

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

export function useCollection() {
  const ctx = useContext(CollectionContext)

  if (!ctx) throw new Error('useCollection must be used within CollectionProvider.')

  return ctx
}
