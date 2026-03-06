/// external dependencies.

import { SSH } from '@peculiar/ssh'

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

export async function generateRSAKeyPair(keySize: SSHKeyPairRSAKeySize): Promise<SSHKeyPair> {
  const keyPair = await SSH.createKeyPair({name: 'rsa', modulusLength: keySize})

  return {
    public:  await keyPair.publicKey .toSSH(),
    private: await keyPair.privateKey.toSSH(),
  }
}

export async function generateECDSAKeyPair(curve: SSHKeyPairECDSACurve): Promise<SSHKeyPair> {
  const keyPair = await SSH.createKeyPair(`ecdsa-p${curve}`)

  return {
    public:  await keyPair.publicKey .toSSH(),
    private: await keyPair.privateKey.toSSH(),
  }
}

export async function generateEd25519KeyPair(): Promise<SSHKeyPair> {
  const keyPair = await SSH.createKeyPair({name: 'ed25519'})

  return {
    public:  await keyPair.publicKey .toSSH(),
    private: await keyPair.privateKey.toSSH(),
  }
}
