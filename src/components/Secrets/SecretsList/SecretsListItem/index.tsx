/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState        } from 'react'

import {
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type {
  Secret,
  SecretText,
} from '@/types/Collection'

// components.

import SecretTextDetails from './SecretTextDetails'

/// component.

export default function SecretsListItem({
  secret,
}: {
  secret: Secret
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return <div className='flex flex-col gap-2'>
    <div className='text-xl font-bold'>
      <FontAwesomeIcon
        icon={isExpanded ? faAngleUp : faAngleDown}

        onClick={() => setIsExpanded(!isExpanded)}
      />

      {secret.name}
    </div>

    {isExpanded && secret.type === 'text' && <SecretTextDetails secret={secret as SecretText} />}
  </div>
}
