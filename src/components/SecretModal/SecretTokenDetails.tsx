/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretTokenV2 } from '@/types/Collection/Secrets/Token'

// components.

import TextInput from '@/components/Form/TextInput'

/// component.

export default function SecretTokenDetails({
  secret,

  setSecret,
  setValid,
  onChange,
}: {
  secret: SecretTokenV2

  setSecret: (secret: SecretTokenV2) => void
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

  return <TextInput
    className='font-mono'
    label    ='value.'
    value    ={secret.value}

    onChange={value =>{
      setSecret({ ...secret, value })
      onChange()
    }}
  />
}