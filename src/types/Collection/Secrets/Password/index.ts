/// external dependencies.

import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import Detail from './Detail'
import Edit   from './Edit'

import type { SecretPasswordV2 } from './types'

export type { SecretPasswordType, SecretPasswordV2 } from './types'

/// configuration.

export default {
  type:  'password',
  label: 'password.',
  icon:  faAsterisk,

  Detail,
  Edit,

  new: (): SecretPasswordV2 => ({
    id:   crypto.randomUUID(),
    type: 'password',

    createdAt: Date.now(),
    updatedAt: Date.now(),

    name: '',
    tags: [],

    user:     '',
    password: '',
  }),

  isValid: (sec: Record<string, unknown>, version: number) => {
    return version >= 2
        && typeof sec.user     === 'string'
        && typeof sec.password === 'string'
  },
}
