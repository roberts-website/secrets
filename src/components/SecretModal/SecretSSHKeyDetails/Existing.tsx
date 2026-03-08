/// internal dependencies.

// types.

import type { SecretSSHKey } from '@/types/Collection'

/// components.

import TextArea from '@/components/Form/TextArea'

/// component.

export default function Existing({
  secret,

  setSecret,
}: {
  secret: SecretSSHKey

  setSecret: (secret: SecretSSHKey) => void
}) {
  return <>
    <TextArea
      className='font-mono'
      label    ='public key.'
      value    ={secret.public}
      onChange ={value => setSecret({ ...secret, public: value })}
    />

    <TextArea
      className='font-mono'
      label    ='private key.'
      value    ={secret.private}
      onChange ={value => setSecret({ ...secret, private: value })}
    />
  </>
}
