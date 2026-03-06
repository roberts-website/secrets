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

// data.

import { SecretTypeNames } from '@/types/Collection'

// components.

import SecretPlainTextDetails from './SecretPlainTextDetails'
import SecretSSHKeyDetails    from './SecretSSHKeyDetails'

import IconButton from '@/components/IconButton'
import Modal      from '@/components/Modal'
import SecretIcon from '@/components/SecretIcon'

/// component.

export default function SecretModal({
  secret = {
    type: 'plain-text',
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
  const [valid,          setValid         ] = useState(false)
  const [internalSecret, setInternalSecret] = useState<Secret>(secret)

  return <Modal
    title  ='new secret.'
    onClose={onClose}
  >
    <div className='flex flex-col gap-4 w-96'>
      <label>
        type.
      </label>
      <div className='flex flex-row gap-1 items-center'>
        <SecretIcon secretType={internalSecret.type} />
        <select
          className='flex-1'
          value    ={internalSecret.type}

          onChange={e => {
            switch (e.target.value) {
              case 'plain-text':
                setInternalSecret({
                  id:    crypto.randomUUID(),
                  type:  'plain-text',
                  name:  '',
                  value: '',
                } as SecretPlainText)
                break
              case 'ssh-key':
                setInternalSecret({
                  id:      crypto.randomUUID(),
                  type:    'ssh-key',
                  name:    '',
                  public:  '',
                  private: '',
                } as SecretSSHKey)
                break
              default:
                throw new Error(`unknown secret type. \`${e.target.value}\``)
            }
          }}
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