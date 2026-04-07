/// external dependencies.

import { faEquals } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import Detail from './Detail'
import Edit   from './Edit'

import { type SecretEnvironmentVariablesV2 } from './types'

export {
  type SecretEnvironmentVariablesType,
  type SecretEnvironmentVariablesV2,
} from './types'

/// configuration.

export default {
  type:  'environment-variables',
  label: 'environment variables.',
  icon:  faEquals,

  Detail,
  Edit,

  new: (): SecretEnvironmentVariablesV2 => ({
    id:   crypto.randomUUID(),
    type: 'environment-variables',

    createdAt: Date.now(),
    updatedAt: Date.now(),

    name: '',
    tags: [],

    variables: [],
  }),

  isValid: (secret: Record<string, unknown>, version: number) => {
    try {
      return version >= 2
          && Array.isArray(secret.variables)
          && secret.variables.every(variable => typeof variable.key === 'string' && variable.key.length > 0 && typeof variable.value === 'string')
    } catch (error) {
      return false
    }
  },
}
