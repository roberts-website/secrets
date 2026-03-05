/// external dependencies.

import type { IconProp } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/// component.

export default function IconButton({
  icon,

  children  = undefined,
  className = '',
  disabled  = false,

  onClick = () => {},
}: {
  icon: IconProp

  children?:  React.ReactNode
  disabled?:  boolean
  className?: string

  onClick: () => void
}) {
  return <button
    className={className}
    
    disabled={disabled}
    onClick ={onClick}
  >
    <FontAwesomeIcon
      className={`${children ? 'mr-2' : ''}`}
      icon     ={icon}
    />
    {children}
  </button>
}