/// external dependencies.

import type { IconProp } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/// component.

export default function IconButton({
  children,
  icon,

  className = '',
  disabled  = false,

  onClick = () => {},
}: {
  children: React.ReactNode
  icon:     IconProp

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
      className='mr-2'
      icon     ={icon}
    />
    {children}
  </button>
}