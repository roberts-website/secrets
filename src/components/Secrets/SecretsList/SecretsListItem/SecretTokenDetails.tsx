/// internal dependencies.

// types.

import type { SecretTokenV2 } from '@/types/Collection'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretTokenDetails({
  secret,
}: {
  secret: SecretTokenV2
}) {
  return <SecretValue
    label='token.'
    value={secret.value}
  />
}