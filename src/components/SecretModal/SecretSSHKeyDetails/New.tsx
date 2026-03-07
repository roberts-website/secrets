/// external dependencies.

import {
  useEffect,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

import type {
  SSHKeyPairAlgorithm,
  SSHKeyPairRSAKeySize,
  SSHKeyPairECDSACurve,
} from '@/types/SSHKeyPair'

import {
  SSHKeyPairAlgorithmNames,
  SSHKeyPairECDSACurveNames,
  SSHKeyPairRSAKeySizeNames,

  generateECDSAKeyPair,
  generateEd25519KeyPair,
  generateRSAKeyPair,
} from '@/types/SSHKeyPair'

// components.

import Select from '@/components/Form/Select'

import Waiting from '@/components/Waiting'

/// component.

export default function New({
  secret,

  setSecret,
  setValid,
}: {
  secret: SecretSSHKey

  setSecret: (secret: SecretSSHKey) => void
  setValid:  (valid: boolean) => void
}) {
  const [algorithm,  setAlgorithm ] = useState<SSHKeyPairAlgorithm >('ed25519')
  const [curve,      setCurve     ] = useState<SSHKeyPairECDSACurve>(521)
  const [generating, setGenerating] = useState<boolean             >(false)
  const [keySize,    setKeySize   ] = useState<SSHKeyPairRSAKeySize>(4096)

  useEffect(() => setValid(true))

  useEffect(
    () => {
      setGenerating(true)

      switch (algorithm) {
        case 'rsa':
          generateRSAKeyPair(keySize).then(keyPair => {
            setSecret({
              type:    'ssh-key',
              id:      crypto.randomUUID(),
              name:    secret.name,
              public:  keyPair.public,
              private: keyPair.private,
            })

            setGenerating(false)
          })
          
          break
        case 'ecdsa':
          generateECDSAKeyPair(curve).then(keyPair => {
            setSecret({
              type:    'ssh-key',
              id:      crypto.randomUUID(),
              name:    secret.name,
              public:  keyPair.public,
              private: keyPair.private,
            })

            setGenerating(false)
          })
          break
        case 'ed25519':
          generateEd25519KeyPair().then(keyPair => {
            setSecret({
              type:    'ssh-key',
              id:      crypto.randomUUID(),
              name:    secret.name,
              public:  keyPair.public,
              private: keyPair.private,
            })

            setGenerating(false)
          })
          break
        default:
          throw new Error(`unknown algorithm. \`${algorithm}\``)
      }
    }, [algorithm, keySize, curve],
  )

  return <>
    {generating && <Waiting zIndex={2} />}

    <Select
      label   ='algorithm.'
      value   ={algorithm}
      options ={Object.entries(SSHKeyPairAlgorithmNames).map(([algorithm, name]) => ({ label: name, value: algorithm }))}
      onChange={(value: string) => setAlgorithm(value as SSHKeyPairAlgorithm)}
    />

    {algorithm === 'rsa' && <>
      <Select
        label   ='key size.'
        value   ={keySize.toString()}
        options ={Object.entries(SSHKeyPairRSAKeySizeNames).map(([keySize, name]) => ({ label: name, value: keySize }))}
        onChange={(value: string) => setKeySize(parseInt(value) as SSHKeyPairRSAKeySize)}
      />
    </>}

    {algorithm === 'ecdsa' && <>
      <Select
        label   ='curve.'
        value   ={curve.toString()}
        options ={Object.entries(SSHKeyPairECDSACurveNames).map(([curve, name]) => ({ label: name, value: curve }))}
        onChange={(value: string) => setCurve(parseInt(value) as SSHKeyPairECDSACurve)}
      />
    </>}
  </>
}