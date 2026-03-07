/// internal dependencies.

// components.

import WrappedField from './WrappedField'

/// component.

export default function TextArea({
  label,
  value,
  
  className = '',

  onChange,
}: {
  label: string
  value: string
  
  className?: string

  onChange: (value: string) => void
}) {
  return <WrappedField label={label}>
    <textarea
      className={className}
      value    ={value}
      onChange ={event => onChange(event.target.value)}
    />
  </WrappedField>
}