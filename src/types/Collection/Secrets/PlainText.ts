/// internal dependencies.

// types.

import type { SecretBaseV1 } from '@/types/Collection/V1'
import type { SecretBaseV2 } from '@/types/Collection/V2'

/// types.

export type SecretPlainTextV1 = SecretBaseV1 & {
  type:  'plain-text'
  value: string
}

export type SecretPlainTextV2 = SecretBaseV2 & {
  type:  'plain-text'
  value: string
}