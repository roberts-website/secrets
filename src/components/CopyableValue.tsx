/// external dependencies.

import { faCopy } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

import IconButton from '@/components/IconButton'

/// component.

export default function CopiableValue({
  value,
}: {
  value: string
}) {
  return <div className='relative w-full group'>
    <pre className='w-full overflow-x-auto text-wrap'>
      {value}
    </pre>

    <IconButton
      className='absolute top-1 right-1 hidden group-hover:block'

      icon={faCopy}
      
      onClick={() => navigator.clipboard.writeText(value)}
    >
      copy.
    </IconButton>
  </div>
}