/// external dependencies.

import { faKey } from '@fortawesome/free-solid-svg-icons'

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
  icon:  faKey,

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
}
