/// types.

export type SecretType = 'text'

export const SecretTypeNames: Record<SecretType, string> = {
  'text': 'plain text.',
}

export type Secret = {
  type:  SecretType
  id:    string
  name:  string
}

export type SecretText = Secret & {
  type:  'text'
  value: string
}

export type Collection = {
  version: 1
  title:   string
  secrets: Secret[]
}
