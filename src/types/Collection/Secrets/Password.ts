/// external dependencies.

import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretPasswordType = 'password'

export type SecretPasswordV2 = SecretBaseV2 & {
  type:     'password'
  user:     string
  password: string
}

/// configuration.

export default {
  type:  'password',
  label: 'password.',
  icon:  faAsterisk,

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
