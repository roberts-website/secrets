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
  SecretTypeIcons,
  SecretTypeNames,
  newSecret,
} from '@/types/Collection'

// components.

import SecretPlainTextDetails from './SecretPlainTextDetails'
import SecretSSHKeyDetails    from './SecretSSHKeyDetails'

import Button from '@/components/Form/Button'
import Select     from '@/components/Form/Select'
import TextInput  from '@/components/Form/TextInput'

import Modal from '@/components/Modal'

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
  const [internalSecret, setInternalSecret] = useState<Secret>(secret ?? newSecret('plain-text'))
  const [isNew,          _                ] = useState(!secret)
  const [valid,          setValid         ] = useState(false)

  return <Modal
    title  ={isNew ? 'new secret.' : 'edit secret.'}
    onClose={onClose}
  >
    <div className='flex flex-col gap-4 w-96'>
      <Select
        disabled={!isNew}
        icon    ={SecretTypeIcons[internalSecret.type]}
        label   ='type.'
        options ={Object.entries(SecretTypeNames).map(([type, name]) => ({ label: name, value: type }))}
        value   ={internalSecret.type}

        onChange={value => setInternalSecret({
          ...newSecret(value as SecretType),
          name: internalSecret.name,
        })}
      />

      <TextInput
        label='name.'
        value={internalSecret.name}
        
        onChange={value => setInternalSecret({ ...internalSecret, name: value })}
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
    
      <Button
        icon    ={faFloppyDisk}
        disabled={!internalSecret.name || !valid}

        onClick={() => onUpdate(internalSecret)}
      >
        {isNew ? 'create.' : 'update.'}
      </Button>
    </div>
  </Modal>
}