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
  const [source, setSource] = useState<Source>(secret.public.length > 0 && secret.private.length > 0 ? 'existing' : 'new')

  useEffect(() => {
    if (source === 'new') {
      setValid(true)
    } else {
      setValid(secret.public.length > 0 && secret.private.length > 0)
    }
  }, [
    source,
    secret.public,
    secret.private,
    setValid,
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
      secret   ={secret}
      setSecret={setSecret}
    />}

    {source === 'existing' && <Existing
      secret   ={secret}
      setSecret={setSecret}
    />}
  </>
}