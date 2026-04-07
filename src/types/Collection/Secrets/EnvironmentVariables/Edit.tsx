/// external dependencies.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faCircleXmark,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import {
  useEffect,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { SecretEnvironmentVariablesV2 } from './types'

// components.

import Button       from '@/components/Form/Button'
import TextInput    from '@/components/Form/TextInput'
import WrappedField from '@/components/Form/WrappedField'

/// types.

type VariableErrors = string[]

/// component.

export default function Edit({
  secret,

  setSecret,
  setValid,
  onChange,
}: {
  secret: SecretEnvironmentVariablesV2

  setSecret: (secret: SecretEnvironmentVariablesV2) => void
  setValid:  (valid: boolean) => void
  onChange:  () => void
}) {
  const [errors, setErrors] = useState<VariableErrors[]>(new Array(secret.variables.length).fill([]))

  useEffect(
    () => {
      const newErrors = new Array(secret.variables.length)
      
      for (let errorIndex = 0; errorIndex < secret.variables.length; errorIndex++) {
        newErrors[errorIndex] = []
      }

      secret.variables.forEach((variable, variableIndex) => {
        if (variable.key.length === 0) {
          newErrors[variableIndex].push('key is required.')
        }
      })

      secret.variables.forEach((variable, variableIndex) => {
        if (variable.key == '') return

        const matchingKeys = secret.variables.filter(v => v.key === variable.key)

        if (matchingKeys.length > 1) {
          newErrors[variableIndex].push('key must be unique.')
        }
      })

      setErrors(newErrors)

      setValid(newErrors.every(e => e.length === 0))
    },
    [
      secret.variables,
      setValid,
    ]
  )

  return <WrappedField label='variables.'>
    <div className='flex min-w-0 w-full flex-col gap-1'>
      {secret.variables.map((variable, variableIndex) =>
        <div
          className='flex flex-col gap-1'
          key      ={variableIndex}
        >
          <div className='flex w-full min-w-0 flex-row gap-1 items-center'>
            <TextInput
              className='min-w-0 flex-1 w-full font-mono'
              value    ={variable.key}

              onChange={newKey => {
                const variables = [...secret.variables]

                variables[variableIndex] = {
                  ...variables[variableIndex],
                  key: newKey.trim(),
                }

                setSecret({
                  ...secret,
                  variables,
                })

                onChange()
              }}
            />
          
            <TextInput
              className='min-w-0 flex-1 w-full font-mono'
              value    ={variable.value}

              onChange={newValue => {
                const variables = [...secret.variables]

                variables[variableIndex] = {
                  ...variables[variableIndex],
                  value: newValue.trim(),
                }

                setSecret({
                  ...secret,
                  variables,
                })

                onChange()
              }}
            />

            <Button
              className='mini w-fit h-auto'

              icon={faTrash}

              onClick={() => {
                setSecret({ ...secret, variables: secret.variables.filter((_, index) => index !== variableIndex) })
              }}
            />
          </div>

          {errors[variableIndex]?.length > 0 && <div className='flex flex-row gap-1'>
            <FontAwesomeIcon
              className='text-red-500'

              icon={faCircleXmark}
            />
            
            <ul className='flex-1 text-sm text-red-500'>
              {errors[variableIndex].map((error, errorIndex) => <li key={errorIndex}>{error}</li>)}
            </ul>
          </div>}
        </div>
      )}

      <Button
        className='mini w-fit'

        icon={faPlus}

        onClick={() => {
          setSecret({
            ...secret,
            variables: [
              ...secret.variables,
              {
                key:   '',
                value: '',
              }
            ],
          })

          onChange()
        }}
      >
        add variable.
      </Button>
    </div>
  </WrappedField>
}
