/// internal dependencies.

// types.

import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretTokenType = 'token'

export type SecretTokenV2 = SecretBaseV2 & {
  type:  'token'
  value: string
}
