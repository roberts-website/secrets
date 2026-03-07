/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretPlainText } from '@/types/Collection'

// components.

import WrappedField from '@/components/WrappedField'

/// component.

export default function SecretPlainTextDetails({
  secret,
  setSecret,
  setValid,
}: {
  secret:    SecretPlainText
  setSecret: (secret: SecretPlainText) => void
  setValid:  (valid: boolean) => void
}) {
  useEffect(
    () => setValid(secret.value.length > 0),
    [secret.value]
  )

  return <WrappedField label='value.'>
    <textarea
      className='font-mono'
      value    ={secret.value}
      onChange ={event => setSecret({ ...secret, value: event.target.value })}
    />
  </WrappedField>
}