/// external dependencies.

import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useState     } from 'react'

/// internal dependencies.

// types.

import type {
  SecretType,

  Secret,

  SecretPlainText,
  SecretSSHKey,
} from '@/types/Collection'

import {
  SecretTypeNames,
  newSecret,
} from '@/types/Collection'

// components.

import SecretPlainTextDetails from './SecretPlainTextDetails'
import SecretSSHKeyDetails    from './SecretSSHKeyDetails'

import IconButton from '@/components/IconButton'
import Modal      from '@/components/Modal'
import SecretIcon from '@/components/SecretIcon'

/// component.

export default function SecretModal({
  secret,

  onClose,
  onSave,
}: {
  secret?: Secret | undefined

  onClose: () => void
  onSave:  (secret: Secret) => void
}) {
  if (!secret) {
    secret = newSecret('plain-text')
  }

  const [valid,          setValid         ] = useState(false)
  const [internalSecret, setInternalSecret] = useState<Secret>(secret ?? newSecret('plain-text'))

  return <Modal
    title  ='new secret.'
    onClose={onClose}
  >
    <div className='flex flex-col gap-4 w-96'>
      <div className='flex flex-col gap-1'>
        <label>
          type.
        </label>
        <div className='flex flex-row gap-1 items-center'>
          <SecretIcon secretType={internalSecret.type} />
          <select
            className='flex-1'
            value    ={internalSecret.type}

            onChange={e => setInternalSecret(newSecret(e.target.value as SecretType))}
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
        </div>
      </div>

      <div className='flex flex-col gap-1'>
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
      </div>

      {internalSecret.type === 'plain-text' && <SecretPlainTextDetails
        secret   ={internalSecret as SecretPlainText}
        setSecret={setInternalSecret}
        setValid ={setValid}
      />}

      {internalSecret.type === 'ssh-key' && <SecretSSHKeyDetails
        secret   ={internalSecret as SecretSSHKey}
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