/// internal dependencies.

// types.

import type { SecretPasswordV2 } from './types'

// components.

import SecretValue from '@/components/SecretValue'

/// component.

export default function Detail({
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
