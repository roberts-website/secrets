/// external dependencies.

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  
  createContext,
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
  setTagSet:     Dispatch<SetStateAction<Set<string>>>
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

  return <CollectionContext.Provider
    value={{
      collection,
      setCollection,
      tagSet,
      setTagSet,
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
