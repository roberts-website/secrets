/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAlignLeft,
  faKey,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { SecretType } from '@/types/Collection'

/// component.

export default function SecretIcon({
  secretType,
}: {
  secretType: SecretType
}) {
  switch (secretType) {
    case 'plain-text':
      return <FontAwesomeIcon icon={faAlignLeft} />
    case 'ssh-key':
      return <FontAwesomeIcon icon={faKey} />
    default:
      return null
  }
}