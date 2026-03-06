/// types.

export type SSHKeyPair = {
  public:  string
  private: string
}

export type SSHKeyPairAlgorithm = 'rsa' | 'ecdsa' | 'ed25519'
export const SSHKeyPairAlgorithmNames: Record<SSHKeyPairAlgorithm, string> = {
  'rsa':     'rsa.',
  'ecdsa':   'ecdsa.',
  'ed25519': 'ed25519.',
}

export type SSHKeyPairRSAKeySize = 2048 | 3072 | 4096
export const SSHKeyPairRSAKeySizeNames: Record<SSHKeyPairRSAKeySize, string> = {
  '2048': '2048.',
  '3072': '3072.',
  '4096': '4096.',
}

export type SSHKeyPairECDSACurve = 256  | 384  | 521
export const SSHKeyPairECDSACurveNames: Record<SSHKeyPairECDSACurve, string> = {
  '256': 'p-256.',
  '384': 'p-384.',
  '521': 'p-521.',
}

export function generateRSAKeyPair(keySize: SSHKeyPairRSAKeySize): SSHKeyPair {
  // TODO
}

export function generateECDSAKeyPair(curve: SSHKeyPairECDSACurve): SSHKeyPair {
  // TODO
}

export function generateEd25519KeyPair(): SSHKeyPair {
  // TODO
}