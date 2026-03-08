/// internal dependencies.

// components.

import WrappedField from './WrappedField'

/// component.

export default function RadioGroup({
  label,
  value,
  options,

  onChange,
}: {
  label:   string
  value:   string
  options: { label: string; value: string }[]

  onChange: (value: string) => void
}) {
  return <WrappedField
    label={label}
  >
    <div className = 'flex flex-row'>
      {options.map(option => (
        <div
          key      ={option.value}
          className={`flex-1 border-1 p-2 text-center font-bold cursor-pointer border-[var(--foreground-color)] ${value === option.value ? 'bg-[var(--foreground-color)] text-[var(--background-color)]' : ''}`}
          onClick  ={() => onChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  
  </WrappedField>
}