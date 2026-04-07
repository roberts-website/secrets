/// internal dependencies.

// types.

import type { SecretV1 } from './Secrets/V1'
import type { SecretV2 } from './Secrets/V2'

import {
  SecretTypes,
  type SecretType,
} from './Secrets'

export { SecretTypes, type SecretType }
                     
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

export function isValid(value: unknown): value is Collection {
  if (!value || typeof value !== 'object')
    return false

  const collection = value as Record<string, unknown>

  if (typeof collection.version !== 'number'     ) return false
  if (collection.version != Math.floor(collection.version)) return false
  if (collection.version < 1 || collection.version > 2    ) return false

  const version = collection.version

  if (typeof collection.title !== 'string') return false
  if (!Array.isArray(collection.secrets)  ) return false

  return collection.secrets.every((secret: Record<string, unknown>) => {
    if (!secret || typeof secret !== 'object') return false

    if (typeof secret.id   !== 'string') return false
    if (typeof secret.name !== 'string') return false
    if (!Array.isArray(secret.tags)    ) return false

    if (version >= 2) {
      if (typeof secret.createdAt !== 'number') return false
      if (typeof secret.updatedAt !== 'number') return false
    }

    if (typeof secret.type !== 'string') return false

    const secretType = secret.type as SecretType

    if (!(secretType in SecretTypes)) return false

    return SecretTypes[secretType].isValid(secret, version)
  })
}
