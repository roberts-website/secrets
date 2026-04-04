/// internal dependencies.

// types.

import type { SecretV2 } from '@/types/Collection/Secrets/V2'

import { SecretTypes } from '@/types/Collection/Secrets'

/// component.

export function SecretPayloadDetail({
  secret,
}: {
  secret: SecretV2
}) {
  const Detail = SecretTypes[secret.type].Detail
  return <Detail secret={secret as never} />
}

export function SecretPayloadEdit({
  secret,

  setSecret,
  setValid,
  onChange,
}: {
  secret: SecretV2

  setSecret: (secret: SecretV2) => void
  setValid:  (valid: boolean) => void
  onChange:  () => void
}) {
  const Edit = SecretTypes[secret.type].Edit
  return <Edit
    secret   ={secret as never}
    setSecret={setSecret as never}
    setValid ={setValid}
    onChange ={onChange}
  />
}
