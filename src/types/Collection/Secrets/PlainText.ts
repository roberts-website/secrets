/// external dependencies.

import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { SecretBaseV1 } from './V1'
import type { SecretBaseV2 } from './V2'

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

/// configuration.

export default {
  type:  'plain-text',
  label: 'plain text.',
  icon:  faAlignLeft,
}