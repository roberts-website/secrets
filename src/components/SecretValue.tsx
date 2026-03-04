/// external dependencies.

import { useState } from 'react'

import {
  faCopy,
  
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import IconButton from '@/components/IconButton'

/// component.

export default function SecretValue({
  label,
  value,
}: {
  label: string
  value: string
}) {
  const [visible, setVisible] = useState(false)

  return <div className='w-full flex flex-col gap-2'>
    <div className='flex flex-row gap-2'>
      <div className='flex-1'>
        {label}
      </div>
      <div className='flex flex-row gap-1'>
        <IconButton
          className='mini'
          icon     ={visible ? faEyeSlash : faEye}
          onClick  ={() => setVisible(!visible)}
        >
          {visible ? 'hide.' : 'show.'}
        </IconButton>

        <IconButton
          className='mini'
          icon     ={faCopy}
          onClick  ={() => navigator.clipboard.writeText(value)}
        >
          copy.
        </IconButton>
      </div>
    </div>

    <pre className='w-full overflow-auto text-wrap bg-[var(--background-color-2)] p-2 max-h-64'>
      {visible ? value : '*'.repeat(16)}
    </pre>
  </div>
}