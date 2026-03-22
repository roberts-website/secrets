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
  const [isOpen,        setIsOpen       ] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return <WrappedField label={label}>
    <div className='relative'>
      <input
        className='w-full'
        type     ='text'
        value    ={value}

        onBlur  ={() => setIsOpen(false)}
        onFocus ={() => setIsOpen(true )}
        onChange={event => onChange(event.target.value)}

        onKeyDown={event => {
          if (event.key === 'Escape') {
            event.preventDefault()

            setIsOpen(false)
            setSelectedIndex(null)

            return
          }

          if (event.key === 'Enter') {
            if (selectedIndex != null) {
              event.preventDefault()

              setIsOpen(false)
              setSelectedIndex(null)
              onChange(options[selectedIndex])
              onSelect(options[selectedIndex])
            } else {
              onSelect(value)
            }

            return
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault()

            setIsOpen(true)

            if (selectedIndex == null) {
              setSelectedIndex(options.length - 1)
            } else {
              if (selectedIndex == 0) {
                setSelectedIndex(null)
              } else {
                setSelectedIndex(selectedIndex - 1)
              }
            }

            return
          }

          if (event.key === 'ArrowDown') {
            event.preventDefault()

            setIsOpen(true)

            if (selectedIndex == null) {
              setSelectedIndex(0)
            } else {
              if (selectedIndex == options.length - 1) {
                setSelectedIndex(null)
              } else {
                setSelectedIndex(selectedIndex + 1)
              }
            }

            return
          }
        }}
      />

      {isOpen && <div className='absolute top-full left-0 right-0 z-10 flex flex-col border-l-2 border-r-2 border-b-2 border-[var(--foreground-color)] outline-l-2 outline-r-2 outline-b-2 outline-[var(--background-color)] bg-[var(--background-color)] shadow-md shadow-[var(--background-color)]'>
        {options.map((option, index) => (
          <div
            className={`cursor-pointer hover:bg-[var(--background-color-2)] p-1 ${selectedIndex == index ? 'bg-[var(--background-color-2)]' : ''}`}
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