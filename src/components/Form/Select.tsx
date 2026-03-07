/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

/// internal dependencies.

// components.

import WrappedField from './WrappedField'

/// component.

export default function Select({
  label,
  value,
  options,

  disabled = false,
  icon     = undefined,

  onChange,
}: {
  label:   string
  value:   string
  options: { label: string; value: string }[]

  disabled?: boolean
  icon?:     IconDefinition | undefined

  onChange: (value: string) => void
}) {
  return <WrappedField label={label}>
    <div className='flex flex-row gap-1 items-center'>
      {icon && <FontAwesomeIcon icon={icon} />}

      <select
        className='flex-1'
        disabled ={disabled}
        onChange ={event => onChange(event.target.value)}
        value    ={value}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  </WrappedField>
}