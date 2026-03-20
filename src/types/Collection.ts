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

export type SecretBaseV1 = {
  id: string

  name: string
  tags: readonly string[]
}

export type SecretBaseV2 = {
  id: string
  
  createdAt: number
  updatedAt: number

  name: string
  tags: readonly string[]
}

export type SecretPlainTextV1 = SecretBaseV1 & {
  type:  'plain-text'
  value: string
}

export type SecretPlainTextV2 = SecretBaseV2 & {
  type:  'plain-text'
  value: string
}

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

export type SecretV1 = SecretPlainTextV1 | SecretSSHKeyV1
export type SecretV2 = SecretPlainTextV2 | SecretSSHKeyV2

export type CollectionBase = {
  version: number
}

export type CollectionV1 = CollectionBase & {
  version: 1
  title:   string
  secrets: SecretV1[]
}

export type CollectionV2 = CollectionBase & {
  version: 2
  title:   string
  secrets: SecretV2[]
}

export type Collection = CollectionV1 | CollectionV2

export function newSecret(type: SecretType): SecretV2 {
  switch (type) {
    case 'plain-text':
      return {
        id:   crypto.randomUUID(),
        type: 'plain-text',

        createdAt: Date.now(),
        updatedAt: Date.now(),

        name: '',
        tags: [],

        value: '',
      }
    case 'ssh-key':
      return {
        id:   crypto.randomUUID(),
        type: 'ssh-key',

        createdAt: Date.now(),
        updatedAt: Date.now(),

        name: '',
        tags: [],

        public:  '',
        private: '',
      }
    default:
      throw new Error(`unknown secret type. \`${type}\``)
  }
}

export function migrateCollection(collection: Collection): CollectionV2 {
  switch (collection.version) {
    case 1:
      return migrateCollection({
        ...collection,
        version: 2,
        secrets: collection.secrets.map((secret: SecretV1, secretIndex: number) => ({
          ...secret,
          createdAt: Date.now() - collection.secrets.length + secretIndex - 1,
          updatedAt: Date.now() - collection.secrets.length + secretIndex - 1,
        }))
      })
    case 2:
      return collection
    default:
      throw new Error(`unknown collection version \`${(collection as Collection).version}\`.`)
  }
}

export function isCollection(value: Collection): boolean {
  if (!value || typeof value !== 'object')
    return false

  const o = value as Record<string, unknown>

  if (typeof o.version !== 'number'     ) return false
  if (o.version != Math.floor(o.version)) return false
  if (o.version < 1 || o.version > 2    ) return false

  const version = o.version

  if (typeof o.title !== 'string') return false
  if (!Array.isArray(o.secrets)  ) return false

  return o.secrets.every(s => {
    const sec = s as Record<string, unknown>

    if (!sec || typeof sec !== 'object') return false

    if (typeof sec.id   !== 'string') return false
    if (typeof sec.name !== 'string') return false
    if (!Array.isArray(sec.tags)    ) return false

    if (version >= 2) {
      if (typeof sec.createdAt !== 'number') return false
      if (typeof sec.updatedAt !== 'number') return false
    }

    switch (sec.type) {
      case 'plain-text':
        if (typeof sec.value !== 'string') return false

        return true
      case 'ssh-key':
        if (typeof sec.public  !== 'string') return false
        if (typeof sec.private !== 'string') return false

        return true
    }

    return false
  })
}
