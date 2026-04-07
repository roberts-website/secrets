/// internal dependencies.

// types.

import type { SecretEnvironmentVariablesV2 } from './types'

// components.

import SecretValue from '@/components/SecretValue'

/// component.

export default function Detail({
  secret,
}: {
  secret: SecretEnvironmentVariablesV2
}) {
  return <div className='flex flex-col gap-1'>
    {secret.variables.map(variable =>
      <div
        className='flex flex-row gap-1 items-center'
        key      ={variable.key}
      >
        <div className='flex-1 font-mono'>
          {variable.key}
        </div>
        <div className='flex-1 md:flex-3'>
          <SecretValue
            inline={true}
            value ={variable.value}
          />
        </div>
      </div>
    )}
  </div>
}
