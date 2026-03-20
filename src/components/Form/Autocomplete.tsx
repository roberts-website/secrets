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
  onSelect,
}: {
  label?:  string | undefined
  options: string[]
  value:   string

  onChange: (value: string) => void
  onSelect: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return <WrappedField label={label}>
    <input
      className='flex-1'
      type     ='text'
      value    ={value}
      onChange ={event => onChange(event.target.value)}

      onFocus={() => setIsOpen(true)}
      onBlur ={() => setIsOpen(false)}

      onKeyDown={event => {
        if (event.key === 'Enter') {
          onSelect(value)
        }
      }}
    />

    {isOpen && <div className='flex flex-col gap-1'>
      {options.map(option => (
        <div key={option} onClick={() => onChange(option)}>
          {option}
        </div>
      ))}
    </div>}
  </WrappedField>
}