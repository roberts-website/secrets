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
  inline = false,
  label  = undefined,
  value,
}: {
  inline?: boolean
  label?:  string
  value:   string
}) {
  const [visible, setVisible] = useState(false)

  const field = <pre className='flex-1 overflow-auto text-wrap bg-[var(--background-color-2)] p-2 max-h-64'>
    {visible ? value : '*'.repeat(16)}
  </pre>

  const buttons = <div className='flex flex-row gap-1 items-center'>
    <Button
      className='mini h-fit'
      icon     ={visible ? faEyeSlash : faEye}
      onClick  ={() => setVisible(!visible)}
    />

    <Button
      className='mini h-fit'
      icon     ={faCopy}
      onClick  ={() => navigator.clipboard.writeText(value)}
    />
  </div>

  if (inline) return <div className='flex flex-row gap-2'>
    {field}
    {buttons}
  </div>

  return <div className='w-full flex flex-col gap-2'>
    <div className='flex flex-row gap-2'>
      {label && <div className='flex-1'>
        {label}
      </div>}
      
      {buttons}
    </div>

    <div className='flex flex-row'>
      {field}
    </div>
  </div>
}