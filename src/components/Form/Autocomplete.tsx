/// external dependencies.

import { useState } from 'react'

/// internal dependencies.

// components.

import WrappedField from '@/components/Form/WrappedField'

/// component.

export default function Autocomplete({
  label = undefined,
  options,
  value,
  
  onChange,
  onKeyDown,
}: {
  label?:  string | undefined
  options: string[]
  value:   string

  onChange:  (value: string) => void
  onKeyDown: (key: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return <WrappedField label={label}>
    <div className='relative'>
      <input
        className='w-full'
        type     ='text'
        value    ={value}

        onBlur ={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true )}

        onChange ={event => onChange(event.target.value)}
        onKeyDown={event => onKeyDown(event.key)}
      />

      {isOpen && <div className='absolute top-full left-0 right-0 z-10 flex flex-col border-l-2 border-r-2 border-b-2 border-[var(--foreground-color)] outline-l-2 outline-r-2 outline-b-2 outline-[var(--background-color)] bg-[var(--background-color)] shadow-md shadow-[var(--background-color)]'>
        {options.map(option => (
          <div
            className='cursor-pointer hover:bg-[var(--background-color-2)] p-1'
            key      ={option}

            onMouseDown={event => {
              event.preventDefault()
              
              onChange(option)
              setIsOpen(false)
            }}
          >
            {option}
          </div>
        ))}
      </div>}
    </div>
  </WrappedField>
}