/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretPlainTextV2 } from '@/types/Collection'

// components.

import TextArea from '@/components/Form/TextArea'

/// component.

export default function SecretPlainTextDetails({
  secret,

  setSecret,
  setValid,
}: {
  secret:    SecretPlainTextV2

  setSecret: (secret: SecretPlainTextV2) => void
  setValid:  (valid: boolean) => void
}) {
  useEffect(
    () => setValid(secret.value.length > 0),
    [
      secret.value,
      setValid,
    ]
  )

  return <TextArea
    className='font-mono'
    label    ='value.'
    value    ={secret.value}

    onChange={value => setSecret({ ...secret, value })}
  />
}