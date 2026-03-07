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

import IconButton   from '@/components/IconButton'
import Modal        from '@/components/Modal'
import SecretIcon   from '@/components/SecretIcon'
import WrappedField from '@/components/WrappedField'

/// component.

export default function SecretModal({
  secret,

  onClose,
  onUpdate,
}: {
  secret?: Secret | undefined

  onClose:  () => void
  onUpdate: (secret: Secret) => void
}) {
  const [valid,          setValid         ] = useState(false)
  const [internalSecret, setInternalSecret] = useState<Secret>(secret ?? newSecret('plain-text'))
  const [isNew,          _                ] = useState(!secret)

  return <Modal
    title  ={isNew ? 'new secret.' : 'edit secret.'}
    onClose={onClose}
  >
    <div className='flex flex-col gap-4 w-96'>
      <WrappedField label='type.'>
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
      </WrappedField>

      <WrappedField label='name.'>
        <input
          type ='text'
          value={internalSecret.name}

          onChange={e => setInternalSecret({
            ...internalSecret,
            name: e.target.value,
          })}
        />
      </WrappedField>

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

        onClick={() => onUpdate(internalSecret)}
      >
        {isNew ? 'create.' : 'update.'}
      </IconButton>
    </div>
  </Modal>
}