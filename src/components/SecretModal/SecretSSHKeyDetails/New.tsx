/// external dependencies.

import {
  useEffect,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKeyV2 } from '@/types/Collection'

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
}: {
  secret: SecretSSHKeyV2

  setSecret: (secret: SecretSSHKeyV2) => void
}) {
  const [id] = useState<string>(() => secret.id ?? crypto.randomUUID())

  const [algorithm,  setAlgorithm ] = useState<SSHKeyPairAlgorithm >('ed25519')
  const [curve,      setCurve     ] = useState<SSHKeyPairECDSACurve>(521)
  const [generating, setGenerating] = useState<boolean             >(false)
  const [keySize,    setKeySize   ] = useState<SSHKeyPairRSAKeySize>(4096)

  useEffect(() => {
    let cancelled = false

    async function generate() {
      setGenerating(true)

      try {
        let keyPair

        switch (algorithm) {
          case 'rsa':
            keyPair = await generateRSAKeyPair(keySize)
            break

          case 'ecdsa':
            keyPair = await generateECDSAKeyPair(curve)
            break

          case 'ed25519':
            keyPair = await generateEd25519KeyPair()
            break

          default:
            throw new Error(`unknown algorithm. \`${algorithm}\``)
        }

        if (cancelled) return

        setSecret({
          id,
          type:    'ssh-key',

          createdAt: Date.now(),
          updatedAt: Date.now(),

          name:    secret.name,
          tags:    secret.tags ?? [],
          
          public:  keyPair.public,
          private: keyPair.private,
        })
      } finally {
        if (!cancelled) {
          setGenerating(false)
        }
      }
    }

    generate()

    return () => {
      cancelled = true
    }
  }, [
    algorithm,
    curve,
    id,
    keySize,
    secret.name,
    secret.tags,
    setSecret,
  ])

  return <>
    {generating && <Waiting zIndex={2} />}

    <Select
      disabled={generating}
      label   ='algorithm.'
      value   ={algorithm}
      options ={Object.entries(SSHKeyPairAlgorithmNames).map(([algorithm, name]) => ({ label: name, value: algorithm }))}
      onChange={(value: string) => setAlgorithm(value as SSHKeyPairAlgorithm)}
    />

    {algorithm === 'rsa' && <>
      <Select
        disabled={generating}
        label   ='key size.'
        value   ={keySize.toString()}
        options ={Object.entries(SSHKeyPairRSAKeySizeNames).map(([keySize, name]) => ({ label: name, value: keySize }))}
        onChange={(value: string) => setKeySize(parseInt(value) as SSHKeyPairRSAKeySize)}
      />
    </>}

    {algorithm === 'ecdsa' && <>
      <Select
        disabled={generating}
        label   ='curve.'
        value   ={curve.toString()}
        options ={Object.entries(SSHKeyPairECDSACurveNames).map(([curve, name]) => ({ label: name, value: curve }))}
        onChange={(value: string) => setCurve(parseInt(value) as SSHKeyPairECDSACurve)}
      />
    </>}
  </>
}