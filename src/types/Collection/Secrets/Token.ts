/// internal dependencies.

// types.

import type { SecretBaseV2 } from '@/types/Collection/V2'

/// types.

export type SecretTokenV2 = SecretBaseV2 & {
  type:  'token'
  value: string
}