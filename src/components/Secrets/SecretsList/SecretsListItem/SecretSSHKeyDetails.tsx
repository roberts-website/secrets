/// internal dependencies.

// types.

import type { SecretSSHKeyV2 } from '@/types/Collection/Secrets/SSHKey'

// components.

import SecretValue from './SecretValue'

/// component.

export default function SecretPlainTextDetails({
  secret,
}: {
  secret: SecretSSHKeyV2
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