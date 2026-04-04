/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretPlainTextV2 } from './types'

// components.

import TextArea from '@/components/Form/TextArea'

/// component.

export default function Edit({
  secret,

  setSecret,
  setValid,
  onChange,
}: {
  secret: SecretPlainTextV2

  setSecret: (secret: SecretPlainTextV2) => void
  setValid:  (valid: boolean) => void
  onChange:  () => void
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

    onChange={value => {
      setSecret({ ...secret, value })
      onChange()
    }}
  />
}
