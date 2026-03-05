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

export default function SecretModal({
  secret = {
    type: 'text',
    id:   crypto.randomUUID(),
    name: '',
  },

  onClose,
  onSave,
}: {
  secret?: Secret

  onClose: () => void
  onSave:  (secret: Secret) => void
}) {
  const [selectedType, setSelectedType] = useState<SecretType>('text')
  const [valid,        setValid       ] = useState(false)

  const [internalSecret, setInternalSecret] = useState<Secret>(secret)

  return <Modal
    title  ='new secret.'
    onClose={onClose}
  >
    <div className='flex flex-col gap-4 w-96'>
      <label>
        type.
      </label>
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

      <label>
        name.
      </label>
      <input
        type ='text'
        value={internalSecret.name}

        onChange={e => setInternalSecret({
          ...internalSecret,
          name: e.target.value,
        })}
      />

      {internalSecret.type === 'text' && <SecretTextDetails
        secret   ={internalSecret as SecretText}
        setSecret={setInternalSecret}
        setValid ={setValid}
      />}
    
      <IconButton
        icon    ={faFloppyDisk}
        disabled={!internalSecret.name || !valid}

        onClick={() => onSave(internalSecret)}
      >
        save.
      </IconButton>
    </div>
  </Modal>
}