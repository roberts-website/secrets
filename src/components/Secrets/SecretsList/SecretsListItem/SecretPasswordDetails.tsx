/// internal dependencies.

// types.

import type { SecretPasswordV2 } from '@/types/Collection'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretPasswordDetails({
  secret,
}: {
  secret: SecretPasswordV2
}) {
  return <>
    <SecretValue
      label='user.'
      value={secret.user}
    />

    <SecretValue
      label='password.'
      value={secret.password}
    />
  </>
}