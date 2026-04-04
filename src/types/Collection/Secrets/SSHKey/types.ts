/// internal dependencies.

// types.

import type { SecretBaseV1 } from '@/types/Collection/Secrets/V1'
import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretSSHKeyType = 'ssh-key'

export type SecretSSHKeyV1 = SecretBaseV1 & {
  type:    'ssh-key'
  public:  string
  private: string
}

export type SecretSSHKeyV2 = SecretBaseV2 & {
  type:    'ssh-key'
  public:  string
  private: string
}
