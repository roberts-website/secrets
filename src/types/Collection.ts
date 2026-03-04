/// types.

export type SecretType = 'text'

export const SecretTypeNames: Record<SecretType, string> = {
  'text': 'Text',
}

export type Secret = {
  type:  SecretType
  id:    string
}

export type SecretText = Secret & {
  type:  'text'
  value: string
}

export type Collection = {
  title:   string
  secrets: Secret[]
}
