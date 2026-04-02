/// internal dependencies.

import type { SecretPasswordV2  } from './Password'
import type { SecretPlainTextV2 } from './PlainText'
import type { SecretSSHKeyV2    } from './SSHKey'
import type { SecretTokenV2     } from './Token'

import type { Tag } from '@/types/Tag'

/// types.

export type SecretBaseV2 = {
  id: string
  
  createdAt: number
  updatedAt: number

  name: string
  tags: readonly Tag[]
}

export type SecretV2 = SecretPasswordV2
                     | SecretPlainTextV2
                     | SecretSSHKeyV2
                     | SecretTokenV2
