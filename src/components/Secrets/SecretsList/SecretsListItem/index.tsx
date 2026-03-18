/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type { Secret } from '@/types/Collection'

// components.

import Header                 from './Header'
import SecretPlainTextDetails from './SecretPlainTextDetails'
import SecretSSHKeyDetails    from './SecretSSHKeyDetails'

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
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  
  return <div className='flex flex-col gap-2'>
    <Header
      isExpanded={isExpanded}
      secret    ={secret}

      onDelete     ={onDelete}
      onEdit       ={onEdit}
      onMoveDown   ={onMoveDown}
      onMoveUp     ={onMoveUp}
      setIsExpanded={setIsExpanded}
    />

    {isExpanded && secret.tags.length > 0 && <div className='flex flex-row gap-1 flex-wrap'>
      {secret.tags.map(tag => (
        <span key={tag} className='text-xs border-1 border-[#808080] rounded-md px-2 py-1'>
          {tag}
        </span>
      ))}
    </div>}

    {isExpanded && secret.type === 'plain-text' && <SecretPlainTextDetails secret={secret} />}
    {isExpanded && secret.type === 'ssh-key'    && <SecretSSHKeyDetails    secret={secret} />}
  </div>
}
