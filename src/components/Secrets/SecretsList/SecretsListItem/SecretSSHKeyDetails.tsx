/// internal dependencies.

// types.

import type { SecretSSHKeyV1 } from '@/types/Collection'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretPlainTextDetails({
  secret,
}: {
  secret: SecretSSHKeyV1
}) {
  return <>
    <SecretValue
      label='public key.'
      value={secret.public}
    />

    <SecretValue
      label='private key.'
      value={secret.private}
    />
  </>
}