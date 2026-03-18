/// internal dependencies.

// components.

import WrappedField from './WrappedField'

/// component.

export default function TextInput({
  label = undefined,
  value,

  onChange,
  onKeyDown,
}: {
  label?: string | undefined
  value:  string

  onChange:   (value: string) => void
  onKeyDown?: (key: string) => void
}) {
  return <WrappedField label={label}>
    <input
      type ='text'
      value={value}

      onChange ={event => onChange(event.target.value)}
      onKeyDown={event => onKeyDown?.(event.key)}
    />
  </WrappedField>
}