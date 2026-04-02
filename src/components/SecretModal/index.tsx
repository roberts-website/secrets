/// external dependencies.

import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useState     } from 'react'

/// internal dependencies.

// types.


import { type SecretV2 } from '@/types/Collection/Secrets/V2'

import {
  type SecretType,
  SecretTypes,
  newSecret,
} from '@/types/Collection/index'

// components.

import SecretPasswordDetails  from './SecretPasswordDetails'
import SecretPlainTextDetails from './SecretPlainTextDetails'
import SecretSSHKeyDetails    from './SecretSSHKeyDetails'
import SecretTokenDetails     from './SecretTokenDetails'
import Tags                   from './Tags'

import Button    from '@/components/Form/Button'
import Select    from '@/components/Form/Select'
import TextInput from '@/components/Form/TextInput'

import Modal from '@/components/Modal'

/// component.

export default function SecretModal({
  secret,

  onClose,
  onUpdate,
}: {
  secret?: SecretV2 | undefined

  onClose:  () => void
  onUpdate: (secret: SecretV2) => void
}) {
  const [internalSecret, setInternalSecret] = useState<SecretV2>(secret ?? newSecret('plain-text'))
  const [valid,          setValid         ] = useState<boolean >(false)
  const [unsavedChanges, setUnsavedChanges] = useState<boolean >(false)

  const [isNew] = useState<boolean>(() => !secret)

  return <Modal
    title={isNew ? 'new secret.' : 'edit secret.'}
    
    onClose={() => {
      if (!unsavedChanges) {
        onClose()
        return
      }

      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose()
      }
    }}
  >
    <div className='flex flex-col gap-4 w-96'>
      <Select
        disabled={!isNew}
        icon    ={SecretTypes[internalSecret.type].icon}
        label   ='type.'
        value   ={internalSecret.type as SecretType}

        options={
          Object
            .entries(SecretTypes)
            .map(
              ([secretType, secretTypeData]) => ({
                label: secretTypeData.label,
                value: secretType,
              })
          )
        }

        onChange={type => {
          setInternalSecret({
            ...newSecret(type as SecretType),
            name: internalSecret.name,
            tags: internalSecret.tags,
          })
          
          setUnsavedChanges(true)
        }}
      />

      <TextInput
        label='name.'
        value={internalSecret.name}
        
        onChange={value => {
          setInternalSecret({ ...internalSecret, name: value })
          setUnsavedChanges(true)
        }}
      />

      <Tags
        secret   ={internalSecret}
        setSecret={setInternalSecret}

        onChange={() => setUnsavedChanges(true)}
      />

      {internalSecret.type === 'plain-text' && <SecretPlainTextDetails
        secret   ={internalSecret}
        setSecret={setInternalSecret}
        setValid ={setValid}

        onChange={() => setUnsavedChanges(true)}
      />}

      {internalSecret.type === 'ssh-key' && <SecretSSHKeyDetails
        secret   ={internalSecret}
        setSecret={setInternalSecret}
        setValid ={setValid}

        onChange={() => setUnsavedChanges(true)}
      />}

      {internalSecret.type === 'token' && <SecretTokenDetails
        secret   ={internalSecret}
        setSecret={setInternalSecret}
        setValid ={setValid}

        onChange={() => setUnsavedChanges(true)}
      />}

      {internalSecret.type === 'password' && <SecretPasswordDetails
        secret   ={internalSecret}
        setSecret={setInternalSecret}
        setValid ={setValid}

        onChange={() => setUnsavedChanges(true)}
      />}
    
      <Button
        icon    ={faFloppyDisk}
        disabled={!internalSecret.name || !valid || !unsavedChanges}

        onClick={() => onUpdate(internalSecret)}
      >
        {isNew ? 'create.' : 'update.'}
      </Button>
    </div>
  </Modal>
}