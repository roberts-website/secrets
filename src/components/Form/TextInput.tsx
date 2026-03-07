/// internal dependencies.

// components.

import WrappedField from './WrappedField'

/// component.

export default function TextInput({
  label,
  value,

  onChange,
}: {
  label: string
  value: string

  onChange: (value: string) => void
}) {
  return <WrappedField label={label}>
    <input
      type    ='text'
      value   ={value}
      onChange={event => onChange(event.target.value)}
    />
  </WrappedField>
}