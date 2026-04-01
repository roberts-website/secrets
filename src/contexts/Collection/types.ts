/// external dependencies.

import {
  type Dispatch,
  type SetStateAction,

  createContext,
} from 'react'

/// internal dependencies.

// types.

import type { CollectionV2 } from '@/types/Collection/index'

/// types.

export type CollectionContextValue = {
  collection:     CollectionV2
  setCollection:  Dispatch<SetStateAction<CollectionV2>>

  unsavedChanges:    boolean
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>

  tagSet: Set<string>
}

export const CollectionContext = createContext<CollectionContextValue | null>(null)
