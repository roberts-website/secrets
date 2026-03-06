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
  type:    'ssh-key'
  public:  string
  private: string
}

export type Collection = {
  version: 1
  title:   string
  secrets: Secret[]
}
