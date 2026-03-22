/// external dependencies.

import { 
  useEffect,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKeyV2 } from '@/types/Collection'

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
  onChange,
}: {
  secret: SecretSSHKeyV2

  setSecret: (secret: SecretSSHKeyV2) => void
  setValid:  (valid: boolean) => void
  onChange:  () => void
}) {
  const [source,         setSource        ] = useState<Source        >(secret.public.length > 0 && secret.private.length > 0 ? 'existing' : 'new')
  const [modifiedSecret, setModifiedSecret] = useState<SecretSSHKeyV2>({ ...secret })

  const [newSecret, setNewSecret] = useState<SecretSSHKeyV2>({
    id:   secret.id,
    type: 'ssh-key',

    createdAt: secret.createdAt,
    updatedAt: secret.updatedAt,

    name: secret.name,
    tags: secret.tags ?? [],

    public:  '',
    private: '',
  })

  useEffect(() => {
    if (source === 'new') {
      setValid(true)

      setSecret({
        ...newSecret,

        createdAt: Date.now(),
        updatedAt: Date.now(),

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

      onChange={value =>{
        setSource(value as Source)
        onChange()
      }}
    />

    {source === 'new' && <New
      secret   ={newSecret}
      setSecret={setNewSecret}

      onChange={onChange}
    />}

    {source === 'existing' && <Existing
      secret   ={modifiedSecret}
      setSecret={setModifiedSecret}

      onChange={onChange}
    />}
  </>
}