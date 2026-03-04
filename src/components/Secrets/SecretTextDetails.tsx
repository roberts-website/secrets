/// internal dependencies.

// types.

import type { SecretText } from '@/types/Collection'

/// component.

export default function SecretTextDetails({
  secret,
  setSecret,
}: {
  secret:    SecretText
  setSecret: (secret: SecretText) => void
}) {
  return <textarea
    value={secret.value}
    placeholder='value.'
    
    onChange={e => setSecret({ ...secret, value: e.target.value })}
  />
}