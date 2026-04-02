/// internal dependencies.

// types.

import type { SecretBaseV1 } from '@/types/Collection/Secrets/V1'
import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretPlainTextType = 'plain-text'

export type SecretPlainTextV1 = SecretBaseV1 & {
  type:  'plain-text'
  value: string
}

export type SecretPlainTextV2 = SecretBaseV2 & {
  type:  'plain-text'
  value: string
}
