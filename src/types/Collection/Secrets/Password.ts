/// internal dependencies.

// types.

import type { SecretBaseV2 } from '@/types/Collection/V2'

/// types.

export type SecretPasswordV2 = SecretBaseV2 & {
  type:     'password'
  user:     string
  password: string
}