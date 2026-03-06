/// internal dependencies.

// types.

import type { SecretPlainText } from '@/types/Collection'

/// component.

export default function SecretPlainTextDetails({
  secret,
  setSecret,
  setValid,
}: {
  secret:    SecretPlainText
  setSecret: (secret: SecretPlainText) => void
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