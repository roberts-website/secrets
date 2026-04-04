/// internal dependencies.

import Password  from './Password'
import PlainText from './PlainText'
import SSHKey    from './SSHKey'
import Token     from './Token'

export { Password, PlainText, SSHKey, Token }

export type { SecretPasswordType, SecretPasswordV2 } from './Password/types'

export type {
  SecretPlainTextType,
  SecretPlainTextV1,
  SecretPlainTextV2,
} from './PlainText/types'

export type {
  SecretSSHKeyType,
  SecretSSHKeyV1,
  SecretSSHKeyV2,
} from './SSHKey/types'

export type { SecretTokenType, SecretTokenV2 } from './Token/types'

export const secretTypeModules = [
  Password,
  PlainText,
  SSHKey,
  Token,
] as const

type SecretTypeModule = (typeof secretTypeModules)[number]

export type SecretType = SecretTypeModule['type']

export const SecretTypes = Object.fromEntries(
  secretTypeModules.map(m => [m.type, m])
) as Record<SecretType, SecretTypeModule>
