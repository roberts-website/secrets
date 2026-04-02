/// external dependencies.

import { faKey } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { SecretBaseV1 } from '@/types/Collection/Secrets/V1'
import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretSSHKeyType = 'ssh-key'

export type SecretSSHKeyV1 = SecretBaseV1 & {
  type:    'ssh-key'
  public:  string
  private: string
}

export type SecretSSHKeyV2 = SecretBaseV2 & {
  type:    'ssh-key'
  public:  string
  private: string
}

/// configuration.

export default {
  type:  'ssh-key',
  label: 'ssh key.',
  icon:  faKey,

  new: (): SecretSSHKeyV2 => ({
    id:   crypto.randomUUID(),
    type: 'ssh-key',

    createdAt: Date.now(),
    updatedAt: Date.now(),

    name: '',
    tags: [],

    public:  '',
    private: '',
  }),

  isValid: (sec: Record<string, unknown>, version: number) => {
    return version >= 1
        && typeof sec.public === 'string'
        && typeof sec.private === 'string'
  },
}