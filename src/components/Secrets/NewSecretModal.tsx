/// external dependencies.

import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useState     } from 'react'

/// internal dependencies.

// types.

import type {
  SecretType,

  Secret,

  SecretText,
} from '@/types/Collection'

// data.

import { SecretTypeNames } from '@/types/Collection'

// components.

import SecretTextDetails from './SecretTextDetails'

import IconButton from '@/components/IconButton'
import Modal      from '@/components/Modal'

/// component.

export default function NewSecretModal({
  onClose,
  onCreate,
}: {
  onClose:  () => void
  onCreate: (secret: Secret) => void
}) {
  const [selectedType, setSelectedType] = useState<SecretType>('text')

  const [secret, setSecret] = useState<Secret>({
    type: selectedType,
    id:   crypto.randomUUID(),
    name: '',
  })

  return <Modal
    title  ='new secret.'
    onClose={onClose}
  >
    <div className='flex flex-col gap-4'>
      <select
        value={selectedType}

        onChange={e => setSelectedType(e.target.value as SecretType)}
      >
        {Object.entries(SecretTypeNames).map(([type, name]) => (
          <option
            key  ={type}
            value={type}
          >
            {name}
          </option>
        ))}
      </select>

      <input
        type       ='text'
        placeholder='name.'

        value={secret.name}

        onChange={e => setSecret({ ...secret, name: e.target.value })}
      />

      {secret.type === 'text' && <SecretTextDetails secret={secret as SecretText} setSecret={setSecret} />}
    
      <IconButton
        icon    ={faFloppyDisk}
        disabled={!secret.name || !secret.value}

        onClick={() => onCreate(secret)}
      >
        save.
      </IconButton>
    </div>
  </Modal>
}