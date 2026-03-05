/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState        } from 'react'

import {
  faAngleDown,
  faAngleUp,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type {
  Secret,
  SecretText,
} from '@/types/Collection'

// components.

import SecretTextDetails from './SecretTextDetails'

import IconButton from '@/components/IconButton'

/// component.

export default function SecretsListItem({
  secret,

  setIsEditing,
  setEditingID,

  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  secret: Secret

  setIsEditing: (isEditing: boolean) => void
  setEditingID: (editingID: string ) => void

  onMoveUp:   () => void
  onMoveDown: () => void
  onDelete:   () => void
}) {
  const [isExpanded, setIsExpanded  ] = useState<boolean>(false)
  
  return <div className='flex flex-col gap-2'>
    <div className='flex flex-row gap-2'>
      <div
        className='flex flex-row gap-2 flex-1 text-xl font-bold cursor-pointer'
        onClick  ={() => setIsExpanded(!isExpanded)}
      >
        <FontAwesomeIcon icon={isExpanded ? faAngleUp : faAngleDown} />
        <div className='flex-1'>{secret.name}</div>
      </div>

      <div className='flex flex-row gap-1'>
        <IconButton
          className='mini'
          icon     ={faAngleUp}

          onClick={() => onMoveUp(secret.id)}
        >
          move up.
        </IconButton>

        <IconButton
          className='mini'
          icon     ={faAngleDown}

          onClick={() => onMoveDown(secret.id)}
        >
          move down.
        </IconButton>

        <IconButton
          className='mini'
          icon     ={faPencil}

          onClick={() => {
            setIsEditing(true)
            setEditingID(secret.id)
          }}
        >
          edit.
        </IconButton>

        <IconButton
          className='mini'
          icon     ={faTrash}

          onClick={() => onDelete(secret.id)}
        >
          delete.
        </IconButton>
      </div>
    </div>

    {isExpanded && secret.type === 'text' && <SecretTextDetails secret={secret as SecretText} />}
  </div>
}
