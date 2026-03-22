/// external dependencies.

import { useContext } from 'react'

/// internal dependencies.

// contexts.

import { SecretContext } from './types'

/// component.

export function useSecret() {
  const ctx = useContext(SecretContext)

  if (!ctx) throw new Error('useSecret must be used within SecretProvider.')

  return ctx
}