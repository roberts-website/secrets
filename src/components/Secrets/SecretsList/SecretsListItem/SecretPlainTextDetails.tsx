/// internal dependencies.

// types.

import type { SecretPlainTextV1 } from '@/types/Collection/index'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretPlainTextDetails({
  secret,
}: {
  secret: SecretPlainTextV1
}) {
  return <SecretValue
    label='value.'
    value={secret.value}
  />
}