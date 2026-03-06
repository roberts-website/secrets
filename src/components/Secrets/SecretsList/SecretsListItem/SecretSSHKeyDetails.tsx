/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretPlainTextDetails({
  secret,
}: {
  secret: SecretSSHKey
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