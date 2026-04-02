/// internal dependencies.

// types.

import type { SecretV1 } from './Secrets/V1'
import type { SecretV2 } from './Secrets/V2'

import Password, {
  type SecretPasswordType,
} from './Secrets/Password'

import PlainText, {
  type SecretPlainTextType,
} from './Secrets/PlainText'

import SSHKey, {
  type SecretSSHKeyType,
} from './Secrets/SSHKey'

import Token, {
  type SecretTokenType,
} from './Secrets/Token'

/// types.

export type SecretType = SecretPlainTextType
                       | SecretSSHKeyType
                       | SecretTokenType
                       | SecretPasswordType

export const SecretTypes = Object.fromEntries(
  [
    Password,
    PlainText,
    SSHKey,
    Token,
  ].map(secretType => ([
    secretType.type,
    secretType,
  ]))
)
                     
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
      return PlainText.new()
    case 'ssh-key':
      return SSHKey.new()
    case 'token':
      return Token.new()
    case 'password':
      return Password.new()
    default: {
      const _exhaustive: never = type
      throw new Error(`unknown secret type. \`${_exhaustive}\``)
    }
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
      case 'token':
        if (version < 2)                   return false
        if (typeof sec.value !== 'string') return false

        return true
      case 'password':
        if (version < 2)                      return false
        if (typeof sec.user     !== 'string') return false
        if (typeof sec.password !== 'string') return false

        return true
    }

    return false
  })
}
