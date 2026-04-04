/// internal dependencies.

// types.

import type { SecretSSHKeyV2 } from './types'

// components.

import SecretValue from '@/components/Secrets/SecretsList/SecretsListItem/SecretValue'

/// component.

export default function Detail({
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
