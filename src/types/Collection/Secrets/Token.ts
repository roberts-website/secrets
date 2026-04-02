/// external dependencies.

import { faCircle } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretTokenType = 'token'

export type SecretTokenV2 = SecretBaseV2 & {
  type:  'token'
  value: string
}

/// configuration.

export default {
  type:  'token',
  label: 'token.',
  icon:  faCircle,
}
