/// internal dependencies.

// types.

import type { SecretTokenV2 } from './types'

// components.

import SecretValue from '@/components/Secrets/SecretsList/SecretsListItem/SecretValue'

/// component.

export default function Detail({
  secret,
}: {
  secret: SecretTokenV2
}) {
  return <SecretValue
    label='token.'
    value={secret.value}
  />
}
