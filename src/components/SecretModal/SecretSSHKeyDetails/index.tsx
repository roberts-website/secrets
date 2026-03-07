/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

// components.

import Existing from './Existing'
import New      from './New'

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
  const [source, setSource] = useState<'new' | 'existing'>(secret.public.length > 0 && secret.private.length > 0 ? 'existing' : 'new')

  return <>
    <div className='flex flex-row'>
      <div
        className={`flex-1 border-1 p-2 text-center font-bold cursor-pointer border-[var(--foreground-color)] ${source === 'new' ? 'bg-[var(--foreground-color)] text-[var(--background-color)]' : ''}`}
        onClick  ={() => setSource('new')}
      >
        new.
      </div>
      <div
        className={`flex-1 border-1 p-2 text-center font-bold cursor-pointer border-[var(--foreground-color)] ${source === 'existing' ? 'bg-[var(--foreground-color)] text-[var(--background-color)]' : ''}`}
        onClick  ={() => setSource('existing')}>
        existing.
      </div>
    </div>

    {source === 'new' && <New
      secret   ={secret}
      setSecret={setSecret}
      setValid ={setValid}
    />}

    {source === 'existing' && <Existing
      secret   ={secret}
      setSecret={setSecret}
      setValid ={setValid}
    />}
  </>
}