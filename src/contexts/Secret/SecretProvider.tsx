/// external dependencies.

import {
  type ReactNode,

  useState,
} from 'react'

/// internal dependencies.

// types.

import {
  type SecretV2,
  
  newSecret,
} from '@/types/Collection'

// contexts.

import { SecretContext } from './types'

/// provider.

export function SecretProvider({
  children,
  secret,
}: {
  children: ReactNode
  secret:   SecretV2 | undefined
}) {
  const [internalSecret, setInternalSecret] = useState<SecretV2>(() => secret ?? newSecret('plain-text'))
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false)

  return <SecretContext.Provider value={{
    secret:    internalSecret,
    setSecret: setInternalSecret,

    unsavedChanges,
    setUnsavedChanges,
  }}>
    {children}
  </SecretContext.Provider>
}