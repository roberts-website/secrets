/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretPlainText } from '@/types/Collection'

// components.

import TextArea from '@/components/Form/TextArea'

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

  return <TextArea
    className='font-mono'
    label    ='value.'
    value    ={secret.value}

    onChange={value => setSecret({ ...secret, value })}
  />
}