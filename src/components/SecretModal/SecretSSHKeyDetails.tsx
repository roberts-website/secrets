/// external dependencies.

import {
  useEffect,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

/// component.

export default function SecretSSHKeyDetails({
  secret,

  setSecret,
  setValid,
}: {
  secret: SecretSSHKey

  setSecret: (secret: SecretSSHKey) => void
  setValid:  (valid: boolean) => void
}) {
  setValid(secret.public.length > 0 && secret.private.length > 0)

  return <>
    <label>
      public key.
    </label>
    <textarea
      className='font-mono'
      
      value={secret.public}
      
      onChange={event => setSecret({ ...secret, public: event.target.value })}
    />

    <label>
      private key.
    </label>
    <textarea
      className='font-mono'
      value={secret.private}
      
      onChange={event => setSecret({ ...secret, private: event.target.value })}
    />
  </>
}