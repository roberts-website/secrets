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

import Waiting      from '@/components/Waiting'
import WrappedField from '@/components/WrappedField'

/// component.

export default function New({
  setSecret,
  setValid,
}: {
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
              name:    '',
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
              name:    '',
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
              name:    '',
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

    <WrappedField label='algorithm.'>
      <select
        value   ={algorithm}
        onChange={event => setAlgorithm(event.target.value as SSHKeyPairAlgorithm)}
      >
        {Object.entries(SSHKeyPairAlgorithmNames).map(([algorithm, name]) => (
          <option
            key  ={algorithm}
            value={algorithm}
          >
            {name}
          </option>
        ))}
      </select>
    </WrappedField>

    {algorithm === 'rsa' && <>
      <WrappedField label='key size.'>
        <select
          value   ={keySize}
          onChange={event => setKeySize(parseInt(event.target.value) as SSHKeyPairRSAKeySize)}
        >
          {Object.entries(SSHKeyPairRSAKeySizeNames).map(([keySize, name]) => (
            <option
              key  ={keySize}
              value={keySize}
            >
              {name}
            </option>
          ))}
        </select>
      </WrappedField>
    </>}

    {algorithm === 'ecdsa' && <>
      <WrappedField label='curve.'>
        <select
          value   ={curve}
          onChange={event => setCurve(parseInt(event.target.value) as SSHKeyPairECDSACurve)}
        >
          {Object.entries(SSHKeyPairECDSACurveNames).map(([curve, name]) => (
            <option
              key  ={curve}
              value={curve}
            >
              {name}
            </option>
          ))}
        </select>
      </WrappedField>
    </>}
  </>
}