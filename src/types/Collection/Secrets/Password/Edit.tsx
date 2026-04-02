/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretPasswordV2 } from './types'

// components.

import TextInput from '@/components/Form/TextInput'

/// component.

export default function Edit({
  secret,

  setSecret,
  setValid,
  onChange,
}: {
  secret: SecretPasswordV2

  setSecret: (secret: SecretPasswordV2) => void
  setValid:  (valid: boolean) => void
  onChange:  () => void
}) {
  useEffect(
    () => setValid(
      secret.user.length > 0 &&
      secret.password.length > 0
    ),
    [
      secret.user,
      secret.password,
      setValid,
    ]
  )

  return <>
    <TextInput
      label    ='user.'
      value    ={secret.user}

      onChange={value => {
        setSecret({ ...secret, user: value })
        onChange()
      }}
    />

    <TextInput
      className='font-mono'
      label    ='password.'
      value    ={secret.password}

      onChange={value => {
        setSecret({ ...secret, password: value })
        onChange()
      }}
    />
  </>
}
