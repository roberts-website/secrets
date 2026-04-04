/// internal dependencies.

import type { SecretPlainTextV1 } from './PlainText'
import type { SecretSSHKeyV1    } from './SSHKey'

import type { Tag } from '@/types/Tag'

/// types.

export type SecretBaseV1 = {
  id: string

  name: string
  tags: readonly Tag[]
}

export type SecretV1 = SecretPlainTextV1
                     | SecretSSHKeyV1