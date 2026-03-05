/// internal dependencies.

// types.

import type { SecretText } from '@/types/Collection'

/// component.

export default function SecretTextDetails({
  secret,
  setSecret,
  setValid,
}: {
  secret:    SecretText
  setSecret: (secret: SecretText) => void
  setValid:  (valid: boolean) => void
}) {
  return <>
    <label>
      value.
    </label>
    <textarea
      className='font-mono'
      
      value={secret.value}
      
      onChange={e => {
        setSecret({ ...secret, value: e.target.value })
        setValid(e.target.value.length > 0)
      }}
    />
  </>
}