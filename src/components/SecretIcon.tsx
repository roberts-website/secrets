/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'

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
    case 'text':
      return <FontAwesomeIcon icon={faAlignLeft} />
    default:
      return null
  }
}