/// internal dependencies.

// types.

import type { SecretText } from '@/types/Collection'

// components.

import SecretValue from '@/components/SecretValue'

/// component.

export default function SecretTextDetails({
  secret,
}: {
  secret: SecretText
}) {
  return <SecretValue
    label='value.'
    value={secret.value}
  />
}