/// external dependencies.

import { useContext } from 'react'

/// internal dependencies.

// contexts.

import { CollectionContext } from './types'

/// component.

export function useCollection() {
  const ctx = useContext(CollectionContext)

  if (!ctx) throw new Error('useCollection must be used within CollectionProvider.')

  return ctx
}
