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
  SSHKeyPairECDSACurve,
  SSHKeyPairRSAKeySize,
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

import Waiting from '@/components/Waiting'

/// component.

export default function SecretSSHKeyDetails({
  secret,

  setSecret,
  setValid,
}: {
  secret: SecretSSHKey

  setSecret: (secret: SecretSSHKey) => void
  setValid:  (valid: boolean) => void
}) {
  const [algorithm,  setAlgorithm ] = useState<SSHKeyPairAlgorithm >('ed25519')
  const [curve,      setCurve     ] = useState<SSHKeyPairECDSACurve>(256      )
  const [generating, setGenerating] = useState<boolean             >(false    )
  const [keySize,    setKeySize   ] = useState<SSHKeyPairRSAKeySize>(2048     )
  const [source,     setSource    ] = useState<'new' | 'existing'  >('new'    )

  useEffect(
    () => {
      if (source == 'new') {
        setValid(true)
        return
      }
      
      setValid(secret.public.length > 0 && secret.private.length > 0)
    },
    [
      source,
      secret.public,
      secret.private,
    ],
  )

  useEffect(
    () => {
      if (source == 'new') {
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

        setGenerating(false)
      }
      
      setGenerating(false)
    }, [source, algorithm, keySize, curve],
  )

  return <>
    {generating && <Waiting zIndex={2} />}

    <div className='flex flex-row'>
      <div
        className={`flex-1 border-1 p-2 text-center font-bold cursor-pointer border-[var(--foreground-color)] ${source === 'new' ? 'bg-[var(--foreground-color)] text-[var(--background-color)]' : ''}`}
        onClick  ={() => setSource('new')}
      >
        new.
      </div>
      <div
        className={`flex-1 border-1 p-2 text-center font-bold cursor-pointer border-[var(--foreground-color)] ${source === 'existing' ? 'bg-[var(--foreground-color)] text-[var(--background-color)]' : ''}`}
        onClick  ={() => setSource('existing')}>
        existing.
      </div>
    </div>

    {source === 'new' && <>
      <div className='flex flex-col gap-1'>
        <label>
          algorithm.
        </label>
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
      </div>

      {algorithm === 'rsa' && <>
        <div className='flex flex-col gap-1'>
          <label>
            key size.
          </label>
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
        </div>
      </>}

      {algorithm === 'ecdsa' && <>
        <div className='flex flex-col gap-1'>
          <label>
            curve.
          </label>
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
        </div>
      </>}
    </>}

    {source === 'existing' && <>
      <div className='flex flex-col gap-1'>
        <label>
          public key.
        </label>
        <textarea
          className='font-mono'
          
          value={secret.public}
          
          onChange={event => setSecret({ ...secret, public: event.target.value })}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label>
          private key.
        </label>
        <textarea
          className='font-mono'
          value={secret.private}
          
          onChange={event => setSecret({ ...secret, private: event.target.value })}
        />
      </div>
    </>}
  </>
}