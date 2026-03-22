/// external dependencies.

import {
  type ReactNode,

  useMemo,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { CollectionV2 } from '@/types/Collection'

// contexts.

import { CollectionContext } from './types'

/// provider.

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

  const tagSet = useMemo(
    () => {
      return new Set(
        collection
          .secrets
          .flatMap(secret => secret.tags)
          .sort()
      )
    },
    [collection],
  )

  return <CollectionContext.Provider
    value={{
      collection,
      setCollection,
      tagSet,
    }}
  >
    {children}
  </CollectionContext.Provider>
}
