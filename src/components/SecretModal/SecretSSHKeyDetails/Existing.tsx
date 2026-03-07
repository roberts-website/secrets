/// external dependencies.

import { useEffect } from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

/// components.

import WrappedField from '@/components/WrappedField'

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
    <WrappedField label='public key.'>
      <textarea
        className='font-mono'
        
        value={secret.public}
        
        onChange={event => setSecret({ ...secret, public: event.target.value })}
      />
    </WrappedField>

    <WrappedField label='private key.'>
      <textarea
        className='font-mono'
        value={secret.private}
        
        onChange={event => setSecret({ ...secret, private: event.target.value })}
      />
    </WrappedField>
  </>
}
