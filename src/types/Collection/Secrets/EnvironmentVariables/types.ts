/// internal dependencies.

// types.

import type { SecretBaseV2 } from '@/types/Collection/Secrets/V2'

/// types.

export type SecretEnvironmentVariablesType = 'environment-variables'

export type SecretEnvironmentVariableType = {
  key:   string
  value: string
}

export type SecretEnvironmentVariablesV2 = SecretBaseV2 & {
  type:      'environment-variables'
  variables: SecretEnvironmentVariableType[]
}
