/// external dependencies.

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import {
  faAlignLeft,
  faKey,
} from '@fortawesome/free-solid-svg-icons'

/// types.

export type SecretType = 'plain-text' | 'ssh-key'

export const SecretTypeNames: Record<SecretType, string> = {
  'plain-text': 'plain text.',
  'ssh-key':    'ssh key.',
}

export const SecretTypeIcons: Record<SecretType, IconDefinition> = {
  'plain-text': faAlignLeft,
  'ssh-key':    faKey,
}

export type SecretBase = {
  id:   string
  name: string
  tags: readonly string[]
}

export type SecretPlainText = SecretBase & {
  type:  'plain-text'
  value: string
}

export type SecretSSHKey = SecretBase & {
  type:    'ssh-key'
  public:  string
  private: string
}

export type Secret = SecretPlainText | SecretSSHKey

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
        tags:  [],
        value: '',
      }
    case 'ssh-key':
      return {
        id:      crypto.randomUUID(),
        type:    'ssh-key',
        name:    '',
        tags:    [],
        public:  '',
        private: '',
      }
    default:
      throw new Error(`unknown secret type. \`${type}\``)
  }
}