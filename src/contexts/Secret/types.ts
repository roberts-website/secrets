/// external dependencies.

import {
  type Dispatch,
  type SetStateAction,

  createContext,
} from 'react'

/// internal dependencies.

// types.

import type { SecretV2 } from '@/types/Collection'

/// types.

export type SecretContextValue = {
  secret:            SecretV2
  setSecret:         Dispatch<SetStateAction<SecretV2>>
  unsavedChanges:    boolean
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>
}

export const SecretContext = createContext<SecretContextValue | null>(null)