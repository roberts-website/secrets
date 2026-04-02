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
