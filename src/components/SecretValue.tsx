/// external dependencies.

import { useState } from 'react'

import {
  faCopy,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import Button from '@/components/Form/Button'

/// component.

export default function SecretValue({
  label = undefined,
  value,
}: {
  label?: string
  value:  string
}) {
  const [visible, setVisible] = useState(false)

  return <div className='w-full flex flex-col gap-2'>
    <div className='flex flex-row gap-2'>
      {label && <div className='flex-1'>
        {label}
      </div>}
      <div className='flex flex-row gap-1'>
        <Button
          className='mini'
          icon     ={visible ? faEyeSlash : faEye}
          onClick  ={() => setVisible(!visible)}
        />

        <Button
          className='mini'
          icon     ={faCopy}
          onClick  ={() => navigator.clipboard.writeText(value)}
        />
      </div>
    </div>

    <pre className='w-full overflow-auto text-wrap bg-[var(--background-color-2)] p-2 max-h-64'>
      {visible ? value : '*'.repeat(16)}
    </pre>
  </div>
}