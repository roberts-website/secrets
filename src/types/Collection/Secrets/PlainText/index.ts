/// external dependencies.

import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import Detail from './Detail'
import Edit   from './Edit'

import type { SecretPlainTextV2 } from './types'

export type {
  SecretPlainTextType,
  SecretPlainTextV1,
  SecretPlainTextV2,
} from './types'

/// configuration.

export default {
  type:  'plain-text',
  label: 'plain text.',
  icon:  faAlignLeft,

  Detail,
  Edit,

  new: (): SecretPlainTextV2 => ({
    id:   crypto.randomUUID(),
    type: 'plain-text',

    createdAt: Date.now(),
    updatedAt: Date.now(),

    name: '',
    tags: [],

    value: '',
  }),

  isValid: (sec: Record<string, unknown>, version: number) => {
    return version >= 1
        && typeof sec.value === 'string'
  },
}
