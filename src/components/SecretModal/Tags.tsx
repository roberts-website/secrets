/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// types.

import type { Secret } from '@/types/Collection'

// components.

import WrappedField from '@/components/Form/WrappedField'
import TextInput    from '@/components/Form/TextInput'

/// component.

export default function Tags({
  secret,

  setSecret,
}: {
  secret: Secret

  setSecret: (secret: Secret) => void
}) {
  const [newTag, setNewTag] = useState('')

  return <WrappedField
    label='tags.'
  >
    <div className='flex flex-row gap-2'>
      {secret.tags.map(tag => {
        return <span
          key      ={tag}
          className='text-sm text-[var(--background-color-2)] bg-[var(--foreground-color)] rounded-md px-2 py-1'
        >
          #{tag}
        </span>
      })}
    </div>

    <TextInput
      value={newTag}

      onChange={value => setNewTag(value)}

      onKeyDown={key => {
        if (key === 'Enter') {
          setSecret({ ...secret, tags: [...secret.tags, newTag] })
          setNewTag('')
        }
      }}
    />
  </WrappedField>
}