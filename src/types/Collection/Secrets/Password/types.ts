/// internal dependencies.

// types.

import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretPasswordType = 'password'

export type SecretPasswordV2 = SecretBaseV2 & {
  type:     'password'
  user:     string
  password: string
}
