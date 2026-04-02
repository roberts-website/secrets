/// internal dependencies.

// types.

import type { SecretPlainTextV2 } from '@/types/Collection/Secrets/PlainText'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretPlainTextDetails({
  secret,
}: {
  secret: SecretPlainTextV2
}) {
  return <SecretValue
    label='value.'
    value={secret.value}
  />
}