/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

/// components.

import TextArea from '@/components/Form/TextArea'

/// component.

export default function Existing({
  secret,

  setSecret,
  setValid,
}: {
  secret: SecretSSHKey

  setSecret: (secret: SecretSSHKey) => void
  setValid:  (valid: boolean) => void
}) {
  useEffect(() => setValid(secret.public.length > 0 && secret.private.length > 0))

  return <>
    <TextArea
      className='font-mono'
      label    ='public key.'
      value    ={secret.public}
      onChange ={value => setSecret({ ...secret, public: value })}
    />

    <TextArea
      className='font-mono'
      label    ='private key.'
      value    ={secret.private}
      onChange ={value => setSecret({ ...secret, private: value })}
    />
  </>
}
