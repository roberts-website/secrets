/// external dependencies.

import {
  type Dispatch,
  type SetStateAction,

  createContext,
} from 'react'

/// internal dependencies.

// types.

import type { CollectionV2 } from '@/types/Collection'

/// types.

export type CollectionContextValue = {
  collection:    CollectionV2
  setCollection: Dispatch<SetStateAction<CollectionV2>>
  tagSet:        Set<string>
}

export const CollectionContext = createContext<CollectionContextValue | null>(null)
