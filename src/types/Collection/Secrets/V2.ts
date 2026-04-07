/// internal dependencies.

import type { SecretEnvironmentVariablesV2 } from './EnvironmentVariables/types'
import type { SecretPasswordV2             } from './Password/types'
import type { SecretPlainTextV2            } from './PlainText/types'
import type { SecretSSHKeyV2               } from './SSHKey/types'
import type { SecretTokenV2                } from './Token/types'

import type { Tag } from '@/types/Tag'

/// types.

export type SecretBaseV2 = {
  id: string
  
  createdAt: number
  updatedAt: number

  name: string
  tags: readonly Tag[]
}

export type SecretV2 = SecretEnvironmentVariablesV2
                     | SecretPasswordV2
                     | SecretPlainTextV2
                     | SecretSSHKeyV2
                     | SecretTokenV2
