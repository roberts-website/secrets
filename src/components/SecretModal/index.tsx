/// external dependencies.

import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useState     } from 'react'

/// internal dependencies.

// types.

import type { SecretType, Secret } from '@/types/Collection'

import {
  SecretTypeIcons,
  SecretTypeNames,
  newSecret,
} from '@/types/Collection'

// components.

import SecretPlainTextDetails from './SecretPlainTextDetails'
import SecretSSHKeyDetails    from './SecretSSHKeyDetails'

import Button       from '@/components/Form/Button'
import Select       from '@/components/Form/Select'
import TextInput    from '@/components/Form/TextInput'
import WrappedField from '@/components/Form/WrappedField'

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
  const [newTag,         setNewTag        ] = useState('')
  const [valid,          setValid         ] = useState(false)

  const [isNew] = useState<boolean>(() => !secret)

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
          tags: internalSecret.tags,
        })}
      />

      <TextInput
        label='name.'
        value={internalSecret.name}
        
        onChange={value => setInternalSecret({ ...internalSecret, name: value })}
      />

      {internalSecret.type === 'plain-text' && <SecretPlainTextDetails
        secret   ={internalSecret}
        setSecret={setInternalSecret}
        setValid ={setValid}
      />}

      {internalSecret.type === 'ssh-key' && <SecretSSHKeyDetails
        secret   ={internalSecret}
        setSecret={setInternalSecret}
        setValid ={setValid}
      />}

      <WrappedField
        label='tags.'
      >
        <div className='flex flex-row gap-2'>
          {internalSecret.tags.map(tag => {
            return <span
              key={tag}
              className='text-sm text-[var(--background-color-2)] bg-[var(--foreground-color)] rounded-md px-2 py-1'
            >
              #{tag}
            </span>
          })}
        </div>
        <TextInput
          value={newTag}

          onChange={value => setNewTag(value)}

          onKeyDown={key => {
            if (key === 'Enter') {
              setInternalSecret({ ...internalSecret, tags: [...internalSecret.tags, newTag] })
              setNewTag('')
            }
          }}
        />
      </WrappedField>
    
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