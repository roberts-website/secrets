/// external dependencies.

import type { IconProp } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/// component.

export default function Button({
  children  = undefined,
  className = '',
  disabled  = false,
  icon      = undefined,

  onClick = () => {},
}: {
  children?:  React.ReactNode
  className?: string
  disabled?:  boolean
  icon?:      IconProp | undefined

  onClick: () => void
}) {
  return <button
    className={className}
    
    disabled={disabled}
    onClick ={onClick}
  >
    {icon && <FontAwesomeIcon
      className={`${children ? 'mr-2' : ''}`}
      icon     ={icon}
    />}
    
    {children}
  </button>
}