/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type {
  Secret,
  SecretPlainText,
  SecretSSHKey,
} from '@/types/Collection'

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

    {isExpanded && secret.type === 'plain-text' && <SecretPlainTextDetails secret={secret as SecretPlainText} />}
    {isExpanded && secret.type === 'ssh-key'    && <SecretSSHKeyDetails    secret={secret as SecretSSHKey   } />}
  </div>
}
