import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { CollectionV2 } from '@/types/Collection'

export type CollectionContextValue = {
  collection:    CollectionV2
  setCollection: Dispatch<SetStateAction<CollectionV2>>
  tagSet:        Set<string>
  updateTagSet:  () => void
}

export const CollectionContext = createContext<CollectionContextValue | null>(null)
