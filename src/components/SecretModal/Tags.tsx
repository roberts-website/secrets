/// external dependencies.

import { faCircleXmark   } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState        } from 'react'

/// internal dependencies.

// types.

import type { SecretV2 } from '@/types/Collection'

// components.

import Autocomplete from '@/components/Form/Autocomplete'
import WrappedField from '@/components/Form/WrappedField'

/// component.

export default function Tags({
  secret,
  tagSet,

  setSecret,
}: {
  secret: SecretV2
  tagSet: Set<string>

  setSecret: (secret: SecretV2) => void
}) {
  const [newTag, setNewTag] = useState('')

  return <WrappedField label='tags.'>
    <div className='flex flex-row flex-wrap gap-2'>
      {secret.tags.map((tag: string) => {
        return <span
          key      ={tag}
          className='text-sm text-[var(--background-color-2)] bg-[var(--foreground-color)] rounded-md pl-1 pr-2 py-1 flex flex-row gap-1 items-center'
        >
          <FontAwesomeIcon
            className='cursor-pointer text-[var(--background-color-2)]'
            icon     ={faCircleXmark}

            onClick={() => setSecret({
              ...secret,
              tags: secret.tags.filter(t => t !== tag),
            })}
          />

          {tag}
        </span>
      })}
    </div>

    <Autocomplete
      options={Array.from(tagSet)}
      value  ={newTag}

      onChange={setNewTag}

      onKeyDown={key => {
        if (key === 'Enter') {
          setSecret({ ...secret, tags: [...secret.tags, newTag] })
          setNewTag('')
        }
      }}
    />
  </WrappedField>
}