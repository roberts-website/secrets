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
import SecretIcon from '@/components/SecretIcon'

/// component.

export default function SecretsListItem({
  secret,

  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}: {
  secret: Secret

  onMoveUp:   () => void
  onMoveDown: () => void
  onEdit:     () => void
  onDelete:   () => void
}) {
  const [isExpanded, setIsExpanded  ] = useState<boolean>(false)
  
  return <div className='flex flex-col gap-2'>
    <div className='flex flex-row gap-2'>
      <div
        className='flex flex-row gap-2 flex-1 text-xl font-bold cursor-pointer items-center'
        onClick  ={() => setIsExpanded(!isExpanded)}
      >
        <FontAwesomeIcon icon={isExpanded ? faAngleUp : faAngleDown} />
        
        <SecretIcon secretType={secret.type} />
        
        <div className='flex-1'>
          {secret.name}
        </div>
      </div>

      <div className='flex flex-row gap-1 items-center'>
        <IconButton
          className='mini'
          icon     ={faAngleUp}
          onClick  ={onMoveUp}
        />

        <IconButton
          className='mini'
          icon     ={faAngleDown}
          onClick  ={onMoveDown}
        />

        <IconButton
          className='mini'
          icon     ={faPencil}
          onClick  ={onEdit}
        />

        <IconButton
          className='mini'
          icon     ={faTrash}
          onClick  ={onDelete}
        />
      </div>
    </div>

    {isExpanded && secret.type === 'text' && <SecretTextDetails secret={secret as SecretText} />}
  </div>
}
