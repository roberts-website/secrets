/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type { SecretV2 } from '@/types/Collection/index'

// components.

import Header                 from './Header'
import SecretPasswordDetails  from './SecretPasswordDetails'
import SecretPlainTextDetails from './SecretPlainTextDetails'
import SecretSSHKeyDetails    from './SecretSSHKeyDetails'
import SecretTokenDetails     from './SecretTokenDetails'

/// component.

export default function SecretsListItem({
  secret,

  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}: {
  secret: SecretV2

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

    {isExpanded && <div className='border-1 border-[var(--foreground-color-2)] rounded-md p-3 my-1 flex flex-col gap-2'>
      {secret.tags.length > 0 && <div className='flex flex-row gap-1 flex-wrap'>
        {secret.tags.map(tag => (
          <span key={tag} className='text-xs border-1 border-[#808080] rounded-md px-2 py-1'>
            {tag}
          </span>
        ))}
      </div>}

      <div className='flex flex-col gap-1'>
        <div className='text-xs text-[var(--foreground-color-2)]'>created {new Date(secret.createdAt).toLocaleString()}.</div>
        <div className='text-xs text-[var(--foreground-color-2)]'>updated {new Date(secret.updatedAt).toLocaleString()}.</div>
      </div>

      {secret.type === 'password'   && <SecretPasswordDetails  secret={secret} />}
      {secret.type === 'plain-text' && <SecretPlainTextDetails secret={secret} />}
      {secret.type === 'ssh-key'    && <SecretSSHKeyDetails    secret={secret} />}
      {secret.type === 'token'      && <SecretTokenDetails     secret={secret} />}
    </div>}
  </div>
}
