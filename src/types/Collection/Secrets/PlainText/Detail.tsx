/// internal dependencies.

// types.

import type { SecretPlainTextV2 } from './types'

// components.

import SecretValue from '@/components/SecretValue'

/// component.

export default function Detail({
  secret,
}: {
  secret: SecretPlainTextV2
}) {
  return <SecretValue
    label='value.'
    value={secret.value}
  />
}
