/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretPlainText } from '@/types/Collection'

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

  return <div className='flex flex-col gap-1'>
    <label>
      value.
    </label>
    <textarea
      className='font-mono'
      value    ={secret.value}
      onChange ={event => setSecret({ ...secret, value: event.target.value })}
    />
  </div>
}