/// internal dependencies.

// types.

import type { SecretPlainText } from '@/types/Collection'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretPlainTextDetails({
  secret,
}: {
  secret: SecretPlainText
}) {
  return <SecretValue
    label='value.'
    value={secret.value}
  />
}