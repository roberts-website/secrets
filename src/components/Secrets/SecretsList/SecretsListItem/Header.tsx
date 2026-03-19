/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAngleDown,
  faAngleUp,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { SecretV1 } from '@/types/Collection'

import { SecretTypeIcons } from '@/types/Collection'

// components.

import Button from '@/components/Form/Button'

/// component.

export default function Header({
  isExpanded,
  secret,

  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  setIsExpanded,
}: {
  isExpanded: boolean
  secret:     SecretV1

  onMoveUp:      () => void
  onMoveDown:    () => void
  onEdit:        () => void
  onDelete:      () => void
  setIsExpanded: (isExpanded: boolean) => void
}) {
  return <div className='flex flex-col gap-2'>
    <div className='flex flex-row gap-2'>
      <div
        className='flex flex-row gap-2 flex-1 text-xl font-bold cursor-pointer items-center'
        onClick  ={() => setIsExpanded(!isExpanded)}
      >
        <FontAwesomeIcon icon={isExpanded ? faAngleUp : faAngleDown} />
        <FontAwesomeIcon icon={SecretTypeIcons[secret.type]} />        
        <div className='flex-1'>
          {secret.name}
        </div>
      </div>
      <div className='flex flex-row gap-1 items-center'>
        <Button
          className='mini'
          icon     ={faAngleUp}
          onClick  ={onMoveUp}
        />
        <Button
          className='mini'
          icon     ={faAngleDown}
          onClick  ={onMoveDown}
        />
        <Button
          className='mini'
          icon     ={faPencil}
          onClick  ={onEdit}
        />
        <Button
          className='mini'
          icon     ={faTrash}
          onClick  ={onDelete}
        />
      </div>
    </div>
  </div>
}