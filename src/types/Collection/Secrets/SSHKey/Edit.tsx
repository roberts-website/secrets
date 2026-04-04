/// external dependencies.

import {
  useEffect,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { SecretSSHKeyV2 } from './types'

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

import RadioGroup from '@/components/Form/RadioGroup'
import Select     from '@/components/Form/Select'
import TextArea   from '@/components/Form/TextArea'

import Waiting from '@/components/Waiting'

/// component.

type Source = 'new' | 'existing'

function ExistingKeyFields({
  secret,

  setSecret,
  onChange,
}: {
  secret: SecretSSHKeyV2

  setSecret: (secret: SecretSSHKeyV2) => void
  onChange:  () => void
}) {
  return <>
    <TextArea
      className='font-mono'
      label    ='public key.'
      value    ={secret.public}
      onChange ={value => {
        setSecret({ ...secret, public: value })
        onChange()
      }}
    />

    <TextArea
      className='font-mono'
      label    ='private key.'
      value    ={secret.private}
      onChange ={value => {
        setSecret({ ...secret, private: value })
        onChange()
      }}
    />
  </>
}

function NewKeyFields({
  secret,

  setSecret,
  onChange,
}: {
  secret: SecretSSHKeyV2

  setSecret: (secret: SecretSSHKeyV2) => void
  onChange:  () => void
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
      onChange={(value: string) => {
        setAlgorithm(value as SSHKeyPairAlgorithm)
        onChange()
      }}
    />

    {algorithm === 'rsa' && <>
      <Select
        disabled={generating}
        label   ='key size.'
        value   ={keySize.toString()}
        options ={Object.entries(SSHKeyPairRSAKeySizeNames).map(([keySize, name]) => ({ label: name, value: keySize }))}
        onChange={(value: string) => {
          setKeySize(parseInt(value) as SSHKeyPairRSAKeySize)
          onChange()
        }}
      />
    </>}

    {algorithm === 'ecdsa' && <>
      <Select
        disabled={generating}
        label   ='curve.'
        value   ={curve.toString()}
        options ={Object.entries(SSHKeyPairECDSACurveNames).map(([curve, name]) => ({ label: name, value: curve }))}
        onChange={(value: string) => {
          setCurve(parseInt(value) as SSHKeyPairECDSACurve)
          onChange()
        }}
      />
    </>}
  </>
}

export default function Edit({
  secret,

  setSecret,
  setValid,
  onChange,
}: {
  secret: SecretSSHKeyV2

  setSecret: (secret: SecretSSHKeyV2) => void
  setValid:  (valid: boolean) => void
  onChange:  () => void
}) {
  const [source,         setSource        ] = useState<Source        >(secret.public.length > 0 && secret.private.length > 0 ? 'existing' : 'new')
  const [modifiedSecret, setModifiedSecret] = useState<SecretSSHKeyV2>({ ...secret })

  const [newSecret, setNewSecret] = useState<SecretSSHKeyV2>({
    id:   secret.id,
    type: 'ssh-key',

    createdAt: secret.createdAt,
    updatedAt: secret.updatedAt,

    name: secret.name,
    tags: secret.tags ?? [],

    public:  '',
    private: '',
  })

  useEffect(() => {
    if (source === 'new') {
      setValid(true)

      setSecret({
        ...newSecret,

        createdAt: Date.now(),
        updatedAt: Date.now(),

        id:   secret.id,
        name: secret.name,
      })
    } else {
      setValid(secret.public.length > 0 && secret.private.length > 0)

      setSecret({
        ...modifiedSecret,

        id:   secret.id,
        name: secret.name,
      })
    }
  }, [
    modifiedSecret,
    newSecret,
    secret.id,
    secret.name,
    secret.private,
    secret.public,
    setSecret,
    setValid,
    source,
  ])

  return <>
    <RadioGroup
      label='source.'
      value={source}

      options={[
        { label: 'new.',      value: 'new'      },
        { label: 'existing.', value: 'existing' },
      ]}

      onChange={value => {
        setSource(value as Source)
        onChange()
      }}
    />

    {source === 'new' && <NewKeyFields
      secret   ={newSecret}
      setSecret={setNewSecret}

      onChange={onChange}
    />}

    {source === 'existing' && <ExistingKeyFields
      secret   ={modifiedSecret}
      setSecret={setModifiedSecret}

      onChange={onChange}
    />}
  </>
}
