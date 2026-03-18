/// external dependencies.

import { 
  useEffect,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

// components.

import Existing from './Existing'
import New      from './New'

import RadioGroup from '@/components/Form/RadioGroup'

/// component.

type Source = 'new' | 'existing'

export default function SecretSSHKeyDetails({
  secret,

  setSecret,
  setValid,
}: {
  secret: SecretSSHKey

  setSecret: (secret: SecretSSHKey) => void
  setValid:  (valid: boolean) => void
}) {
  const [source,         setSource        ] = useState<Source      >(secret.public.length > 0 && secret.private.length > 0 ? 'existing' : 'new')
  const [newSecret,      setNewSecret     ] = useState<SecretSSHKey>({ id: secret.id, type: 'ssh-key', name: secret.name, tags: secret.tags ?? [], public: '', private: '' })
  const [modifiedSecret, setModifiedSecret] = useState<SecretSSHKey>({ ...secret })

  useEffect(() => {
    if (source === 'new') {
      setValid(true)
      setSecret({
        ...newSecret,
        id:   secret.id,
        name: secret.name,
      })
    } else {
      setValid(secret.public.length > 0 && secret.private.length > 0)
      setSecret({
        ...modifiedSecret,
        id:   secret.id,
        name: secret.name,
      })
    }
  }, [
    modifiedSecret,
    newSecret,
    secret.id,
    secret.name,
    secret.private,
    secret.public,
    setSecret,
    setValid,
    source,
  ])

  return <>
    <RadioGroup
      label='source.'
      value={source}
      
      options={[
        { label: 'new.',      value: 'new'      },
        { label: 'existing.', value: 'existing' },
      ]}

      onChange={value => setSource(value as Source)}
    />

    {source === 'new' && <New
      secret   ={newSecret}
      setSecret={setNewSecret}
    />}

    {source === 'existing' && <Existing
      secret   ={modifiedSecret}
      setSecret={setModifiedSecret}
    />}
  </>
}