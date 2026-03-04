/// internal dependencies.

// types.

import type { SecretText } from '@/types/Collection'

// components.

import CopyableValue from '@/components/CopyableValue'

/// component.

export default function SecretTextDetails({
  secret,
}: {
  secret: SecretText
}) {
  return <CopyableValue value={secret.value} />
}