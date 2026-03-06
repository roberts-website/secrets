/// internal dependencies.

import type {
  SSHKeyPairAlgorithm,
} from '@/types/SSHKeyPair'

/// types.

export type SecretType = 'plain-text' | 'ssh-key'

export const SecretTypeNames: Record<SecretType, string> = {
  'plain-text': 'plain text.',
  'ssh-key':    'ssh key.',
}

export type Secret = {
  type:  SecretType
  id:    string
  name:  string
}

export type SecretPlainText = Secret & {
  type:  'plain-text'
  value: string
}

export type SecretSSHKey = Secret & {
  type:      'ssh-key'
  public:    string
  private:   string
}

export type Collection = {
  version: 1
  title:   string
  secrets: Secret[]
}

export function newSecret(type: SecretType): Secret {
  switch (type) {
    case 'plain-text':
      return {
        id:    crypto.randomUUID(),
        type:  'plain-text',
        name:  '',
        value: '',
      } as SecretPlainText
    case 'ssh-key':
      return {
        id:      crypto.randomUUID(),
        type:    'ssh-key',
        name:    '',
        public:  '',
        private: '',
      } as SecretSSHKey
    default:
      throw new Error(`unknown secret type. \`${type}\``)
  }
}