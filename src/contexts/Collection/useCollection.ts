import { useContext } from 'react'

import { CollectionContext } from './collection-context'

export function useCollection() {
  const ctx = useContext(CollectionContext)

  if (!ctx) throw new Error('useCollection must be used within CollectionProvider.')

  return ctx
}
