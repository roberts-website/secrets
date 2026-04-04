/// external dependencies.

import { faKey } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import Detail from './Detail'
import Edit   from './Edit'

import type { SecretSSHKeyV2 } from './types'

export type {
  SecretSSHKeyType,
  SecretSSHKeyV1,
  SecretSSHKeyV2,
} from './types'

/// configuration.

export default {
  type:  'ssh-key',
  label: 'ssh key.',
  icon:  faKey,

  Detail,
  Edit,

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
