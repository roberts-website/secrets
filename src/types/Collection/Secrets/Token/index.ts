/// external dependencies.

import { faCircle } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import Detail from './Detail'
import Edit   from './Edit'

import type { SecretTokenV2 } from './types'

export type { SecretTokenType, SecretTokenV2 } from './types'

/// configuration.

export default {
  type:  'token',
  label: 'token.',
  icon:  faCircle,

  Detail,
  Edit,

  new: (): SecretTokenV2 => ({
    id:   crypto.randomUUID(),
    type: 'token',

    createdAt: Date.now(),
    updatedAt: Date.now(),

    name: '',
    tags: [],

    value: '',
  }),

  isValid: (sec: Record<string, unknown>, version: number) => {
    return version >= 2
        && typeof sec.value === 'string'
  },
}
