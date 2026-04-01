/// internal dependencies.

// components.

import WrappedField from './WrappedField'

/// component.

export default function TextInput({
  className = '',
  label = undefined,
  value,

  onChange,
  onKeyDown,
}: {
  className?: string
  label?:     string | undefined
  value:      string

  onChange:   (value: string) => void
  onKeyDown?: (key: string) => void
}) {
  return <WrappedField label={label}>
    <input
      className={className}
      type ='text'
      value={value}

      onChange ={event => onChange(event.target.value)}
      onKeyDown={event => onKeyDown?.(event.key)}
    />
  </WrappedField>
}